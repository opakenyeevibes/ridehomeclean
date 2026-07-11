"use client";

export function GoogleAuthButton({ label = "Lanjut dengan Google" }: { label?: string }) {
  const continueWithGoogle = () => {
    window.alert("Login Google belum diaktifkan untuk production. Untuk sementara gunakan email dan password.");
  };

  return (
    <button
      type="button"
      onClick={continueWithGoogle}
      className="flex h-12 w-full items-center justify-center gap-3 rounded-2xl border border-[#D8DEDA] bg-white text-sm font-black text-[#16332E] shadow-sm transition hover:border-[#6FCF97] hover:shadow-[0_10px_24px_rgba(31,111,95,.09)] active:scale-[.99]"
    >
      <span className="grid size-6 place-items-center rounded-full bg-white text-base font-black shadow-[0_2px_8px_rgba(22,51,46,.12)]">
        <span className="bg-gradient-to-r from-[#4285F4] via-[#34A853] to-[#EA4335] bg-clip-text text-transparent">G</span>
      </span>
      {label} <span className="rounded-full bg-[#FFF6DE] px-2 py-1 text-[9px] text-[#1F6F5F]">Segera</span>
    </button>
  );
}
