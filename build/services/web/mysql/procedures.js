"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userUpdate = exports.userInsert = exports.userDomainParamValues = exports.userProviderAssignmentInsert = exports.userProviderAssignmentDelete = exports.userProviderAssignmentParamValues = exports.userAddressInsertOrUpdate = exports.userAddressDelete = exports.userAddressParamValues = exports.userAccessLevelUpdate = exports.userAccessLevelParamValues = exports.serviceAddonDelete = exports.serviceAddonParamValues = exports.reservationUpdate = exports.reservationInsert = exports.reservationParamValues = exports.reservationAddonInsert = exports.reservationAddonDelete = exports.reservationAddonParamValues = exports.promoUpdate = exports.promoUpdateParamValues = exports.promoDelete = exports.promoDeleteParamValues = exports.promoApply = exports.promoApplyParamValues = exports.managementDomainRateInsert = exports.managementDomainRateParamValues = exports.managementDomainUpdate = exports.managementDomainInsert = exports.managementDomainParamValues = exports.isActiveUpdate = exports.isActiveParamValues = exports.completedSessionUpdateNote = exports.completedSessionNoteParamValues = exports.completedSessionInsert = exports.completedSessionParamValues = exports.completedSessionServiceAddonInsert = exports.completedSessionAddonDelete = exports.completedSessionAddonParamValues = exports.addressUpdate = exports.addressInsert = exports.addressDomainParamValues = void 0;

/* eslint-disable no-tabs prefer-default-export */
// /////////////////////////////////////////////
var addressDomainParamValues = function addressDomainParamValues(queryNumber, id, province, city, barangay, roomNumber, bldgNumber, zip, landmark) {
  return "SET \n    @addressId_".concat(queryNumber, " = ").concat(id, ", \n    @province_").concat(queryNumber, " = '").concat(province, "', \n    @city_").concat(queryNumber, " = '").concat(city, "', \n    @barangay_").concat(queryNumber, " = '").concat(barangay, "', \n    @roomNumber_").concat(queryNumber, " = '").concat(roomNumber, "', \n    @bldgNumber_").concat(queryNumber, " = '").concat(bldgNumber, "', \n    @zip_").concat(queryNumber, " = '").concat(zip, "', \n    @landmark_").concat(queryNumber, " = '").concat(landmark, "'\n    ; $$");
};

exports.addressDomainParamValues = addressDomainParamValues;

var addressInsert = function addressInsert(queryNumber) {
  return " CALL addressInsert(\n    @addressId_".concat(queryNumber, ", \n    @province_").concat(queryNumber, ", \n    @city_").concat(queryNumber, ", \n    @barangay_").concat(queryNumber, ", \n    @roomNumber_").concat(queryNumber, ", \n    @bldgNumber_").concat(queryNumber, ", \n    @zip_").concat(queryNumber, ", \n    @landmark_").concat(queryNumber, "\n    ); $$ ");
};

exports.addressInsert = addressInsert;

var addressUpdate = function addressUpdate(queryNumber) {
  return " CALL addressUpdate(\n    @addressId_".concat(queryNumber, ", \n    @province_").concat(queryNumber, ", \n    @city_").concat(queryNumber, ", \n    @barangay_").concat(queryNumber, ", \n    @roomNumber_").concat(queryNumber, ", \n    @bldgNumber_").concat(queryNumber, ", \n    @zip_").concat(queryNumber, ", \n    @landmark_").concat(queryNumber, "\n    ); $$ ");
}; // ////////////////////////////////////////////////////////////


exports.addressUpdate = addressUpdate;

var completedSessionAddonParamValues = function completedSessionAddonParamValues(queryNumber, id, serviceId, addonId) {
  return "SET \n      @completedSessionId_".concat(queryNumber, " = ").concat(id, ", \n      @serviceId_").concat(queryNumber, " = ").concat(serviceId, ", \n      @addonId_").concat(queryNumber, " = ").concat(addonId, "\n      ; $$");
};

exports.completedSessionAddonParamValues = completedSessionAddonParamValues;

var completedSessionAddonDelete = function completedSessionAddonDelete(queryNumber) {
  return " CALL completedSessionAddonDelete(\n    @completedSessionId_".concat(queryNumber, ", \n    @serviceId_").concat(queryNumber, ", \n    @addonId_").concat(queryNumber, "\n    ); $$ ");
};

exports.completedSessionAddonDelete = completedSessionAddonDelete;

var completedSessionServiceAddonInsert = function completedSessionServiceAddonInsert(queryNumber) {
  return " CALL completedSessionServiceAddonInsert(\n    @completedSessionId_".concat(queryNumber, ", \n    @serviceId_").concat(queryNumber, ",\n    @addonId_").concat(queryNumber, "\n    ); $$ ");
}; // ////////////////////////////////////////////////////////


exports.completedSessionServiceAddonInsert = completedSessionServiceAddonInsert;

var completedSessionParamValues = function completedSessionParamValues(queryNumber, id, reservationId, recurrencyNumber, completedSessionDate, completedSessionNote) {
  return "SET \n      @completedSessionId_".concat(queryNumber, " = ").concat(id, ", \n      @reservationId_").concat(queryNumber, " = ").concat(reservationId, ",\n      @recurrencyNumber_").concat(queryNumber, " = '").concat(recurrencyNumber, "', \n      @completedSessionDate_").concat(queryNumber, " = '").concat(completedSessionDate, "',\n      @completedSessionNote_").concat(queryNumber, " = '").concat(completedSessionNote, "'\n      ; $$");
};

exports.completedSessionParamValues = completedSessionParamValues;

var completedSessionInsert = function completedSessionInsert(queryNumber) {
  return " CALL completedSessionInsert(\n    @completedSessionId_".concat(queryNumber, ", \n    @reservationId_").concat(queryNumber, ",\n    @recurrencyNumber_").concat(queryNumber, ", \n    @completedSessionDate_").concat(queryNumber, ",\n    @completedSessionNote_").concat(queryNumber, "\n    ); $$ ");
}; // ////////////////////////////////////////////////////


exports.completedSessionInsert = completedSessionInsert;

var completedSessionNoteParamValues = function completedSessionNoteParamValues(queryNumber, id, completedSessionNote) {
  return "SET \n      @completedSessionId_".concat(queryNumber, " = ").concat(id, ", \n      @completedSessionNote_").concat(queryNumber, " = '").concat(completedSessionNote, "'\n      ; $$");
};

exports.completedSessionNoteParamValues = completedSessionNoteParamValues;

var completedSessionUpdateNote = function completedSessionUpdateNote(queryNumber) {
  return " CALL completedSessionUpdateNote(\n    @completedSessionId_".concat(queryNumber, ", \n    @completedSessionNote_").concat(queryNumber, "\n    ); $$ ");
}; // ////////////////////////////////////////////////


exports.completedSessionUpdateNote = completedSessionUpdateNote;

var isActiveParamValues = function isActiveParamValues(queryNumber, domainType, domainId, isActive) {
  return "SET \n      @domain_".concat(queryNumber, " = '").concat(domainType, "', \n      @domainId_").concat(queryNumber, " = ").concat(domainId, ",\n      @domainIsActive_").concat(queryNumber, " = ").concat(isActive, ",\n      ; $$");
};

exports.isActiveParamValues = isActiveParamValues;

var isActiveUpdate = function isActiveUpdate(queryNumber) {
  return " CALL isActiveUpdate(\n    @domain_".concat(queryNumber, ", \n    @domainId_").concat(queryNumber, ",\n    @domainIsActive_").concat(queryNumber, "\n    ); $$ ");
}; // /////////////////////////////////////////////


exports.isActiveUpdate = isActiveUpdate;

var managementDomainParamValues = function managementDomainParamValues(queryNumber, id, domainType, domainName, description) {
  return "SET \n      @managementDomainId_".concat(queryNumber, " = ").concat(id, ", \n      @managementDomainType_").concat(queryNumber, " = '").concat(domainType, "',\n      @managementDomainName_").concat(queryNumber, " = '").concat(domainName, "',\n      @managementDomainDescription_").concat(queryNumber, " = '").concat(description, "'\n      ; $$");
};

exports.managementDomainParamValues = managementDomainParamValues;

var managementDomainInsert = function managementDomainInsert(queryNumber) {
  return " CALL managementDomainInsert(\n    @managementDomainId_".concat(queryNumber, ", \n    @managementDomainType_").concat(queryNumber, ",\n    @managementDomainName_").concat(queryNumber, ",\n    @managementDomainDescription_").concat(queryNumber, "\n    ); $$ ");
};

exports.managementDomainInsert = managementDomainInsert;

var managementDomainUpdate = function managementDomainUpdate(queryNumber) {
  return " CALL managementDomainUpdate(\n    @managementDomainId_".concat(queryNumber, ", \n    @managementDomainType_").concat(queryNumber, ",\n    @managementDomainName_").concat(queryNumber, ",\n    @managementDomainDescription_").concat(queryNumber, "\n    ); $$ ");
}; // //////////////////////////////////////////


exports.managementDomainUpdate = managementDomainUpdate;

var managementDomainRateParamValues = function managementDomainRateParamValues(queryNumber, id, domainId, domainType, rate, rateOperator, byPercentage) {
  return "SET \n      @managementDomainRateId_".concat(queryNumber, " = ").concat(id, ",\n      @managementDomainId_").concat(queryNumber, " = ").concat(domainId, ", \n      @managementDomainType_").concat(queryNumber, " = '").concat(domainType, "',\n      @managementDomainRate_").concat(queryNumber, " = ").concat(rate, ",\n      @managementDomainRateOperator_").concat(queryNumber, " = ").concat(rateOperator, ",\n      @mangementDomainRateByPercentage_").concat(queryNumber, " = ").concat(byPercentage, "\n      ; $$");
};

exports.managementDomainRateParamValues = managementDomainRateParamValues;

var managementDomainRateInsert = function managementDomainRateInsert(queryNumber) {
  return " CALL managementDomainRateInsert(\n    @managementDomainRateId_".concat(queryNumber, ", \n    @managementDomainId_").concat(queryNumber, ", \n    @managementDomainType_").concat(queryNumber, ",\n    @managementDomainRate_").concat(queryNumber, ",\n    @managementDomainRateOperator_").concat(queryNumber, ",\n    @mangementDomainRateByPercentage_").concat(queryNumber, "\n    ); $$ ");
}; // //////////////////////////////////////////////////////


exports.managementDomainRateInsert = managementDomainRateInsert;

var promoApplyParamValues = function promoApplyParamValues(queryNumber, id, domainType, domainId, promoId, startDate, endDate) {
  return "SET \n      @appliedPromoId_".concat(queryNumber, " = ").concat(id, ", \n      @promoDomainType_").concat(queryNumber, " = '").concat(domainType, "',\n      @promoDomainId_").concat(queryNumber, " = ").concat(domainId, ",\n      @promoId_").concat(queryNumber, " = ").concat(promoId, ",\n      @promoStartDate_").concat(queryNumber, " = '").concat(startDate, "',\n      @promoEndDate_").concat(queryNumber, " = '").concat(endDate, "'\n      ; $$");
};

exports.promoApplyParamValues = promoApplyParamValues;

var promoApply = function promoApply(queryNumber) {
  return " CALL promoApply(\n    @appliedPromoId_".concat(queryNumber, ", \n    @promoDomainType_").concat(queryNumber, ",\n    @promoDomainId_").concat(queryNumber, ",\n    @promoId_").concat(queryNumber, ",\n    @promoStartDate_").concat(queryNumber, ",\n    @promoEndDate_").concat(queryNumber, "\n    ); $$ ");
}; // ///////////////////////////////////////////////////


exports.promoApply = promoApply;

var promoDeleteParamValues = function promoDeleteParamValues(queryNumber, id, domainId) {
  return "SET \n      @appliedPromoId_".concat(queryNumber, " = ").concat(id, ",\n      @promoDomainId_").concat(queryNumber, " = ").concat(domainId, "\n      ; $$");
};

exports.promoDeleteParamValues = promoDeleteParamValues;

var promoDelete = function promoDelete(queryNumber) {
  return " CALL promoDelete(\n    @appliedPromoId_".concat(queryNumber, ", \n    @promoDomainId_").concat(queryNumber, "\n    ); $$ ");
}; // ////////////////////////////////////////


exports.promoDelete = promoDelete;

var promoUpdateParamValues = function promoUpdateParamValues(queryNumber, id, domainType, startDate, endDate) {
  return "SET \n      @appliedPromoId_".concat(queryNumber, " = ").concat(id, ", \n      @promoDomainType_").concat(queryNumber, " = '").concat(domainType, "',\n      @promoStartDate_").concat(queryNumber, " = '").concat(startDate, "',\n      @promoEndDate_").concat(queryNumber, " = '").concat(endDate, "'\n      ; $$");
};

exports.promoUpdateParamValues = promoUpdateParamValues;

var promoUpdate = function promoUpdate(queryNumber) {
  return " CALL promoUpdate(\n    @appliedPromoId_".concat(queryNumber, ", \n    @promoDomainType_").concat(queryNumber, ",\n    @promoStartDate_").concat(queryNumber, ",\n    @promoEndDate_").concat(queryNumber, "\n    ); $$ ");
}; // //////////////////////////////////////


exports.promoUpdate = promoUpdate;

var reservationAddonParamValues = function reservationAddonParamValues(queryNumber, reservationId, serviceId, addonId) {
  return "SET \n      @reservationId_".concat(queryNumber, " = ").concat(reservationId, ", \n      @serviceId_").concat(queryNumber, " = ").concat(serviceId, ",\n      @addonId_").concat(queryNumber, " = ").concat(addonId, "\n      ); $$ ");
};

exports.reservationAddonParamValues = reservationAddonParamValues;

var reservationAddonDelete = function reservationAddonDelete(queryNumber) {
  return " CALL reservationAddonDelete(\n    @reservationId_".concat(queryNumber, ", \n    @serviceId_").concat(queryNumber, ",\n    @addonId_").concat(queryNumber, "\n    ); $$ ");
};

exports.reservationAddonDelete = reservationAddonDelete;

var reservationAddonInsert = function reservationAddonInsert(queryNumber) {
  return " CALL reservationAddonInsert(\n    @reservationId_".concat(queryNumber, ", \n    @serviceId_").concat(queryNumber, ",\n    @addonId_").concat(queryNumber, "\n    ); $$ ");
}; // /////////////////////////////////////////


exports.reservationAddonInsert = reservationAddonInsert;

var reservationParamValues = function reservationParamValues(queryNumber, id, userId, addressId, status, initialDate, additionalNote) {
  return "SET \n      @reservationId_".concat(queryNumber, " = ").concat(id, ",\n      @userId_").concat(queryNumber, " = ").concat(userId, ",\n      @addressId_").concat(queryNumber, " = ").concat(addressId, ",\n      @reservationStatus_").concat(queryNumber, " = ").concat(status, ",\n      @reservationInitialDate_").concat(queryNumber, " = '").concat(initialDate, "',\n      @reservationAdditionalNote_").concat(queryNumber, " = '").concat(additionalNote, "'\n      ; $$");
};

exports.reservationParamValues = reservationParamValues;

var reservationInsert = function reservationInsert(queryNumber) {
  return " CALL reservationInsert(\n    @reservationId_".concat(queryNumber, ", \n    @userId_").concat(queryNumber, ",\n    @addressId_").concat(queryNumber, ",\n    @reservationStatus_").concat(queryNumber, ",\n    @reservationInitialDate_").concat(queryNumber, ",\n    @reservationAdditionalNote_").concat(queryNumber, "\n    ); $$ ");
};

exports.reservationInsert = reservationInsert;

var reservationUpdate = function reservationUpdate(queryNumber) {
  return " CALL reservationUpdate(\n    @reservationId_".concat(queryNumber, ",\n    @addressId_").concat(queryNumber, ",\n    @reservationStatus_").concat(queryNumber, ",\n    @reservationInitialDate_").concat(queryNumber, ",\n    @reservationAdditionalNote_").concat(queryNumber, "\n    ); $$ ");
}; // /////////////////////////////////


exports.reservationUpdate = reservationUpdate;

var serviceAddonParamValues = function serviceAddonParamValues(queryNumber, serviceId, addonId) {
  return "SET \n      @serviceId_".concat(queryNumber, " = ").concat(serviceId, ",\n      @addonId_").concat(queryNumber, " = ").concat(addonId, "\n      ; $$");
};

exports.serviceAddonParamValues = serviceAddonParamValues;

var serviceAddonDelete = function serviceAddonDelete(queryNumber) {
  return " CALL serviceAddonDelete(\n    @serviceId_".concat(queryNumber, ",\n    @addonId_").concat(queryNumber, "\n    ); $$ ");
}; // ////////////////////////////////////////////


exports.serviceAddonDelete = serviceAddonDelete;

var userAccessLevelParamValues = function userAccessLevelParamValues(queryNumber, userId, userAccessLevelIsBasic, userAccessLevelIsProvider, userAccessLevelIsAdmin) {
  return "SET \n      @userId_".concat(queryNumber, " = ").concat(userId, ",\n      @userAccessLevelIsBasic_").concat(queryNumber, " = ").concat(userAccessLevelIsBasic, ",\n      @userAccessLevelIsProvider_").concat(queryNumber, " = ").concat(userAccessLevelIsProvider, ",\n      @userAccessLevelIsAdmin_").concat(queryNumber, " = ").concat(userAccessLevelIsAdmin, "\n      ); $$ ");
};

exports.userAccessLevelParamValues = userAccessLevelParamValues;

var userAccessLevelUpdate = function userAccessLevelUpdate(queryNumber) {
  return " CALL userAccessLevelUpdate(\n    @userId_".concat(queryNumber, ",\n    @userAccessLevelIsBasic_").concat(queryNumber, ",\n    @userAccessLevelIsProvider_").concat(queryNumber, ",\n    @userAccessLevelIsAdmin_").concat(queryNumber, "\n    ); $$ ");
}; // ///////////////////////////////


exports.userAccessLevelUpdate = userAccessLevelUpdate;

var userAddressParamValues = function userAddressParamValues(queryNumber, id, reservationId) {
  var recurrencyNumber = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'NULL';
  return "SET \n      @userId_".concat(queryNumber, " = ").concat(id, ",\n      @addressId_").concat(queryNumber, " = ").concat(reservationId, ",\n      @userAddressIsDefault_").concat(queryNumber, " = ").concat(recurrencyNumber, "\n      ; $$");
};

exports.userAddressParamValues = userAddressParamValues;

var userAddressDelete = function userAddressDelete(queryNumber) {
  return " CALL userAddressDelete(\n    @userId_".concat(queryNumber, ",\n    @addressId_").concat(queryNumber, "\n    ); $$ ");
};

exports.userAddressDelete = userAddressDelete;

var userAddressInsertOrUpdate = function userAddressInsertOrUpdate(queryNumber) {
  return " CALL userAddressInsertOrUpdate(\n    @userId_".concat(queryNumber, ",\n    @addressId_").concat(queryNumber, ",\n    @userAddressIsDefault_").concat(queryNumber, "\n    ); $$ ");
}; // ////////////////////////////////////////////////////////


exports.userAddressInsertOrUpdate = userAddressInsertOrUpdate;

var userProviderAssignmentParamValues = function userProviderAssignmentParamValues(queryNumber, id, reservationId, recurrencyNumber) {
  return "SET \n      @userProviderId_".concat(queryNumber, " = ").concat(id, ",\n      @reservationId_").concat(queryNumber, " = ").concat(reservationId, ",\n      @recurrencyNumber_").concat(queryNumber, " = ").concat(recurrencyNumber, "\n      ; $$");
};

exports.userProviderAssignmentParamValues = userProviderAssignmentParamValues;

var userProviderAssignmentDelete = function userProviderAssignmentDelete(queryNumber) {
  return " CALL userProviderAssignmentDelete(\n    @userProviderId_".concat(queryNumber, ",\n    @reservationId_").concat(queryNumber, ",\n    @recurrencyNumber_").concat(queryNumber, "\n    ); $$ ");
};

exports.userProviderAssignmentDelete = userProviderAssignmentDelete;

var userProviderAssignmentInsert = function userProviderAssignmentInsert(queryNumber) {
  return " CALL userProviderAssignmentInsert(\n    @userProviderId_".concat(queryNumber, ",\n    @reservationId_").concat(queryNumber, ",\n    @recurrencyNumber_").concat(queryNumber, "\n    ); $$ ");
}; // /////////////////////////////////////////////////////


exports.userProviderAssignmentInsert = userProviderAssignmentInsert;

var userDomainParamValues = function userDomainParamValues(queryNumber, id, firstname, lastname, dateOfBirth, gender, email, contactNumber) {
  return "SET \n    @userId_".concat(queryNumber, " = ").concat(id, ", \n    @firstname_").concat(queryNumber, " = '").concat(firstname, "', \n    @lastname_").concat(queryNumber, " = '").concat(lastname, "', \n    @dateOfBirth_").concat(queryNumber, " = '").concat(dateOfBirth, "', \n    @gender_").concat(queryNumber, " = '").concat(gender, "', \n    @email_").concat(queryNumber, " = '").concat(email, "', \n    @contactNumber_").concat(queryNumber, " = '").concat(contactNumber, "'\n    ; $$");
};

exports.userDomainParamValues = userDomainParamValues;

var userInsert = function userInsert(queryNumber) {
  return " CALL userInsert(\n    @userId_".concat(queryNumber, ",\n    @firstname_").concat(queryNumber, ",\n    @lastname_").concat(queryNumber, ",\n    @dateOfBirth_").concat(queryNumber, ",\n    @gender_").concat(queryNumber, ",\n    @email_").concat(queryNumber, ",\n    @contactNumber_").concat(queryNumber, "\n    ); $$ ");
};

exports.userInsert = userInsert;

var userUpdate = function userUpdate(queryNumber) {
  return " CALL userUpdate(\n    @userId_".concat(queryNumber, ",\n    @firstname_").concat(queryNumber, ",\n    @lastname_").concat(queryNumber, ",\n    @dateOfBirth_").concat(queryNumber, ",\n    @gender_").concat(queryNumber, ",\n    @email_").concat(queryNumber, ",\n    @contactNumber_").concat(queryNumber, "\n    ); $$ ");
};

exports.userUpdate = userUpdate;