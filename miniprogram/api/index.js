import ServiceFactory from "./service-factory";

const getService = (serviceName) => {
  return ServiceFactory[serviceName];
};

export { getService };
