"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerController = void 0;
const customerService_1 = require("../services/customerService");
class CustomerController {
    handleCustomerData(req, res) {
        return customerService_1.CustomerService.handleCustomerData(req, res);
    }
}
exports.CustomerController = CustomerController;
