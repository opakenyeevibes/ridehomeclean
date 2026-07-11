import assert from "node:assert/strict";
import { services } from "../src/data/services";
import { calculateBooking, getAvailableAddOns } from "../src/lib/bookingRules";

const byId = (id: string) => {
  const service = services.find((item) => item.id === id);
  assert.ok(service, `Service ${id} harus ada`);
  return service;
};

const motor = byId("bike-wash");
assert.equal(motor.active ?? true, true, "Motor Care harus aktif dan bisa dipesan");
assert.ok(motor.packages.length > 0, "Motor Care harus punya paket");
assert.ok(motor.addOns.every((addon) => ["helmet", "bike-wax", "chain-light"].includes(addon.id)), "Motor Care hanya punya add-on motor");

const motorBasic = motor.packages.find((item) => item.id === "basic") ?? motor.packages[0];
const motorPremium = motor.packages.find((item) => item.id === "premium") ?? motor.packages[0];
assert.equal(getAvailableAddOns(motor, motorBasic.id).some((addon) => addon.id === "chain-light"), false, "Add-on premium motor tidak muncul di paket basic");
assert.equal(getAvailableAddOns(motor, motorPremium.id).some((addon) => addon.id === "chain-light"), true, "Add-on premium motor muncul di paket premium");

const motorOne = calculateBooking({ service: motor, selectedPackage: motorBasic, quantity: 1, selectedAddOns: [], teamCount: 1, urgent: false });
const motorThree = calculateBooking({ service: motor, selectedPackage: motorBasic, quantity: 3, selectedAddOns: [], teamCount: 1, urgent: false });
assert.equal(motorOne.minimumWorkers, 1, "1 motor cukup 1 partner");
assert.equal(motorThree.minimumWorkers, 2, "3 motor minimal naik jadi 2 partner/tim");
assert.ok(motorThree.basePrice > motorOne.basePrice, "Harga Motor Care naik sesuai jumlah motor");

const home = byId("home-cleaning");
const homePremium = home.packages.find((item) => item.id === "premium");
assert.ok(homePremium, "Premium harus tersedia sebagai paket di Home Care");
assert.ok(home.addOns.every((addon) => !["helmet", "bike-wax", "chain-light"].includes(addon.id)), "Home Care tidak boleh menampilkan add-on motor");

const premiumLegacy = byId("premium");
assert.equal(premiumLegacy.active, false, "Premium Care lama harus inactive/deprecated untuk pemesanan baru");
assert.equal(premiumLegacy.deprecated, true, "Premium Care lama ditandai deprecated");

const custom = byId("custom");
assert.equal(custom.customQuoteOnly, true, "Custom Care harus menghasilkan request quotation");
assert.equal(custom.pricingUnit, "quote", "Custom Care tidak boleh dihitung seperti paket instan biasa");

console.log("Booking audit tests passed.");
