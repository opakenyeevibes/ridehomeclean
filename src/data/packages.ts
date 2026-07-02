import { services } from "./services";
export const packages = services.flatMap((service) => service.packages.map((item) => ({ ...item, serviceId: service.id, serviceName: service.name })));
