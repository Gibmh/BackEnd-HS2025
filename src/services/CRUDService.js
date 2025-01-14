import db from "../models/index";
const { Op } = require("sequelize");

const NewObject = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("Received data.typeOb:", data);
      switch (data.typeOb) {
        case "book": {
          await db.products.create({
            id_product: data.id_product,
            id_consignor: data.id_consignor,
            name: data.name,
            age: data.age,
            genre: data.genre,
            classify: data.classify,
            bc_cost: data.bc_cost,
            discount: data.discount,
            price: data.price,
            cash_back: data.cash_back,
            quantity: data.quantity,
            sold: data.sold,
            stock: data.stock,
          });
          break;
        }
        case "order": {
          await db.orders.create({
            id_bill: data.id_bill,
            name_cashier: data.name_cashier,
            create_time: data.create_time,
            pay_methods: data.pay_methods,
            name_book: data.name_book,
            price: data.price,
          });
          break;
        }
        case "member": {
          await db.members.create({
            id_member: data.id_member,
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role,
            total_order: data.total_order,
            revenue: data.revenue,
          });
          break;
        }
        case "consignor": {
          await db.consignors.create({
            id_consignor: data.id_consignor,
            name: data.name,
            id_bank: data.id_bank,
            bank_name: data.bank_name,
            holder_name: data.holder_name,
            cash_back: data.cash_back,
            id_member: data.id_member,
          });
          break;
        }
      }

      resolve({ success: true, message: "Create success!" });
    } catch (error) {
      reject({ success: false, message: error.message });
    }
  });
};

let readAllinfo = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data_res = {};
      console.log("Received data.typeOb:", data.typeOb);
      switch (data.typeOb) {
        case "book":
          data_res = await db.products.findAll({ raw: true });
          break;
        case "order":
          data_res = await db.orders.findAll({ raw: true });
          break;
        case "member":
          data_res = await db.members.findAll({ raw: true });
          break;
        case "consignor":
          data_res = await db.consignors.findAll({ raw: true });
          break;
        default:
          data_res = { error: "Invalid typeOb" };
          break;
      }
      resolve({ success: true, data: data_res });
    } catch (error) {
      reject({ success: false, message: error.message });
    }
  });
};

let getInfobyId = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data_res = {};
      switch (data.typeOb) {
        case "book": {
          data_res = await db.products.findOne({
            where: { id_product: data.ID },
            raw: true,
          });
          break;
        }
        case "order": {
          data_res = await db.orders.findOne({
            where: { id_bill: data.ID },
            raw: true,
          });
          break;
        }
        case "member": {
          data_res = await db.members.findOne({
            where: { id_member: data.ID },
            raw: true,
          });
          break;
        }
        case "consignor": {
          data_res = await db.consignors.findOne({
            where: { id_consignor: data.ID },
            raw: true,
          });
          break;
        }
      }

      if (data_res) {
        resolve({ success: true, data: data_res });
      } else {
        resolve({ success: false, message: "No record found" });
      }
    } catch (error) {
      reject({ success: false, message: error.message });
    }
  });
};

let updateObject = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data_res = {};
      console.log("Received data.typeOb:", data.id);

      switch (data.typeOb) {
        case "book": {
          data_res = await db.products.findOne({
            where: { id_product: data.id },
            raw: true,
          });
          if (data_res) {
            await db.products.update(data, { where: { id_product: data.id } });
          }
          break;
        }
        case "order": {
          data_res = await db.orders.findOne({
            where: { id_bill: data.id },
            raw: true,
          });
          if (data_res) {
            await db.orders.update(data, { where: { id_bill: data.id } });
          }
          break;
        }
        case "member": {
          console.log("Received data.id:", data.id);
          data_res = await db.members.findOne({
            where: { id_member: data.id },
            raw: true,
          });
          if (data_res) {
            await db.members.update(data, { where: { id_member: data.id } });
          }
          break;
        }
        case "consignor": {
          data_res = await db.consignors.findOne({
            where: { id_consignor: data.id },
            raw: true,
          });
          if (data_res) {
            await db.consignors.update(data, {
              where: { id_consignor: data.id },
            });
          }
          break;
        }
      }

      if (data_res) {
        resolve({ success: true, message: "Updated successfully" });
      } else {
        resolve({ success: false, message: "No record found" });
      }
    } catch (error) {
      reject({ success: false, message: error.message });
    }
  });
};

let deleteOb = (rq) => {
  return new Promise(async (resolve, reject) => {
    try {
      let ob = {};
      console.log("Received rq.typeOb:", rq);

      switch (rq.typeOb) {
        case "book":
          ob = await db.products.findOne({
            where: { id_product: rq.id },
          });
          break;
        case "order":
          ob = await db.orders.findOne({
            where: { id_bill: rq.id },
          });
          break;
        case "member":
          ob = await db.members.findOne({
            where: { id_member: rq.id },
          });
          break;
        case "consignor":
          ob = await db.consignors.findOne({
            where: { id_consignor: rq.id },
          });
          break;
        default:
          console.log("Unknown typeOb:", rq.typeOb);
          break;
      }

      if (ob) {
        await ob.destroy();
        resolve({ success: true, message: "Record deleted successfully" });
      } else {
        resolve({ success: false, message: "No record found to delete" });
      }
    } catch (error) {
      reject({ success: false, message: error.message });
      console.error("Error deleting record:", error);
    }
  });
};

let LoginCheck = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("Received data:", data);
      let user = await db.members.findOne({
        where: { id_member: data.id_member },
        raw: true,
      });
      if (user) {
        if (user.password === data.password) {
          console.log("Login successful");
          resolve({ success: true, role: user.role });
        } else {
          console.log("Incorrect password");
          resolve({ success: false, message: "Incorrect password" });
        }
      } else {
        console.log("User not found");
        resolve({ success: false, message: "User not found" });
      }
    } catch (error) {
      console.error("Error logging in:", error);
      reject({ success: false, message: error.message });
    }
  });
};

module.exports = {
  NewObject: NewObject,
  readAllinfo: readAllinfo,
  getInfobyId: getInfobyId,
  updateObject: updateObject,
  deleteOb: deleteOb,
  LoginCheck: LoginCheck,
};
