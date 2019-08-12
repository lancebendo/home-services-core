"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userUpdate = exports.userInsert = exports.userDomainParamValues = exports.userProviderAssignmentInsert = exports.userProviderAssignmentDelete = exports.userProviderAssignmentParamValues = exports.userAddressInsertOrUpdate = exports.userAddressDelete = exports.userAddressParamValues = exports.userAccessLevelUpdate = exports.userAccessLevelParamValues = exports.serviceAddonDelete = exports.serviceAddonParamValues = exports.reservationUpdate = exports.reservationInsert = exports.reservationParamValues = exports.reservationAddonInsert = exports.reservationAddonDelete = exports.reservationAddonParamValues = exports.promoUpdate = exports.promoUpdateParamValues = exports.promoDelete = exports.promoDeleteParamValues = exports.promoApply = exports.promoApplyParamValues = exports.managementDomainRateInsert = exports.managementDomainRateParamValues = exports.managementDomainUpdate = exports.managementDomainInsert = exports.managementDomainParamValues = exports.isActiveUpdate = exports.isActiveParamValues = exports.completedSessionUpdateNote = exports.completedSessionNoteParamValues = exports.completedSessionInsert = exports.completedSessionParamValues = exports.completedSessionServiceAddonInsert = exports.completedSessionAddonDelete = exports.completedSessionAddonParamValues = exports.addressUpdate = exports.addressInsert = exports.addressDomainParamValues = void 0;

/* eslint-disable no-tabs prefer-default-export */
// /////////////////////////////////////////////
const addressDomainParamValues = (queryNumber, id, province, city, barangay, roomNumber, bldgNumber, zip, landmark) => `SET 
    @addressId_${queryNumber} = ${id}, 
    @province_${queryNumber} = '${province}', 
    @city_${queryNumber} = '${city}', 
    @barangay_${queryNumber} = '${barangay}', 
    @roomNumber_${queryNumber} = '${roomNumber}', 
    @bldgNumber_${queryNumber} = '${bldgNumber}', 
    @zip_${queryNumber} = '${zip}', 
    @landmark_${queryNumber} = '${landmark}'
    ; $$`;

exports.addressDomainParamValues = addressDomainParamValues;

const addressInsert = queryNumber => ` CALL addressInsert(
    @addressId_${queryNumber}, 
    @province_${queryNumber}, 
    @city_${queryNumber}, 
    @barangay_${queryNumber}, 
    @roomNumber_${queryNumber}, 
    @bldgNumber_${queryNumber}, 
    @zip_${queryNumber}, 
    @landmark_${queryNumber}
    ); $$ `;

exports.addressInsert = addressInsert;

const addressUpdate = queryNumber => ` CALL addressUpdate(
    @addressId_${queryNumber}, 
    @province_${queryNumber}, 
    @city_${queryNumber}, 
    @barangay_${queryNumber}, 
    @roomNumber_${queryNumber}, 
    @bldgNumber_${queryNumber}, 
    @zip_${queryNumber}, 
    @landmark_${queryNumber}
    ); $$ `; // ////////////////////////////////////////////////////////////


exports.addressUpdate = addressUpdate;

const completedSessionAddonParamValues = (queryNumber, id, serviceId, addonId) => `SET 
      @completedSessionId_${queryNumber} = ${id}, 
      @serviceId_${queryNumber} = ${serviceId}, 
      @addonId_${queryNumber} = ${addonId}
      ; $$`;

exports.completedSessionAddonParamValues = completedSessionAddonParamValues;

const completedSessionAddonDelete = queryNumber => ` CALL completedSessionAddonDelete(
    @completedSessionId_${queryNumber}, 
    @serviceId_${queryNumber}, 
    @addonId_${queryNumber}
    ); $$ `;

exports.completedSessionAddonDelete = completedSessionAddonDelete;

const completedSessionServiceAddonInsert = queryNumber => ` CALL completedSessionServiceAddonInsert(
    @completedSessionId_${queryNumber}, 
    @serviceId_${queryNumber},
    @addonId_${queryNumber}
    ); $$ `; // ////////////////////////////////////////////////////////


exports.completedSessionServiceAddonInsert = completedSessionServiceAddonInsert;

const completedSessionParamValues = (queryNumber, id, reservationId, recurrencyNumber, completedSessionDate, completedSessionNote) => `SET 
      @completedSessionId_${queryNumber} = ${id}, 
      @reservationId_${queryNumber} = ${reservationId},
      @recurrencyNumber_${queryNumber} = '${recurrencyNumber}', 
      @completedSessionDate_${queryNumber} = '${completedSessionDate}',
      @completedSessionNote_${queryNumber} = '${completedSessionNote}'
      ; $$`;

exports.completedSessionParamValues = completedSessionParamValues;

const completedSessionInsert = queryNumber => ` CALL completedSessionInsert(
    @completedSessionId_${queryNumber}, 
    @reservationId_${queryNumber},
    @recurrencyNumber_${queryNumber}, 
    @completedSessionDate_${queryNumber},
    @completedSessionNote_${queryNumber}
    ); $$ `; // ////////////////////////////////////////////////////


exports.completedSessionInsert = completedSessionInsert;

const completedSessionNoteParamValues = (queryNumber, id, completedSessionNote) => `SET 
      @completedSessionId_${queryNumber} = ${id}, 
      @completedSessionNote_${queryNumber} = '${completedSessionNote}'
      ; $$`;

exports.completedSessionNoteParamValues = completedSessionNoteParamValues;

const completedSessionUpdateNote = queryNumber => ` CALL completedSessionUpdateNote(
    @completedSessionId_${queryNumber}, 
    @completedSessionNote_${queryNumber}
    ); $$ `; // ////////////////////////////////////////////////


exports.completedSessionUpdateNote = completedSessionUpdateNote;

const isActiveParamValues = (queryNumber, domainType, domainId, isActive) => `SET 
      @domain_${queryNumber} = '${domainType}', 
      @domainId_${queryNumber} = ${domainId},
      @domainIsActive_${queryNumber} = ${isActive},
      ; $$`;

exports.isActiveParamValues = isActiveParamValues;

const isActiveUpdate = queryNumber => ` CALL isActiveUpdate(
    @domain_${queryNumber}, 
    @domainId_${queryNumber},
    @domainIsActive_${queryNumber}
    ); $$ `; // /////////////////////////////////////////////


exports.isActiveUpdate = isActiveUpdate;

const managementDomainParamValues = (queryNumber, id, domainType, domainName, description) => `SET 
      @managementDomainId_${queryNumber} = ${id}, 
      @managementDomainType_${queryNumber} = '${domainType}',
      @managementDomainName_${queryNumber} = '${domainName}',
      @managementDomainDescription_${queryNumber} = '${description}'
      ;`;

exports.managementDomainParamValues = managementDomainParamValues;

const managementDomainInsert = queryNumber => ` CALL managementDomainInsert(
    @managementDomainId_${queryNumber}, 
    @managementDomainType_${queryNumber},
    @managementDomainName_${queryNumber},
    @managementDomainDescription_${queryNumber}
    );`;

exports.managementDomainInsert = managementDomainInsert;

const managementDomainUpdate = queryNumber => ` CALL managementDomainUpdate(
    @managementDomainId_${queryNumber}, 
    @managementDomainType_${queryNumber},
    @managementDomainName_${queryNumber},
    @managementDomainDescription_${queryNumber}
    ); $$ `; // //////////////////////////////////////////


exports.managementDomainUpdate = managementDomainUpdate;

const managementDomainRateParamValues = (queryNumber, id, domainId, domainType, rate, rateOperator, byPercentage) => `SET 
      @managementDomainRateId_${queryNumber} = ${id},
      @managementDomainId_${queryNumber} = ${domainId}, 
      @managementDomainType_${queryNumber} = '${domainType}',
      @managementDomainRate_${queryNumber} = ${rate},
      @managementDomainRateOperator_${queryNumber} = ${rateOperator},
      @mangementDomainRateByPercentage_${queryNumber} = ${byPercentage}
      ; $$`;

exports.managementDomainRateParamValues = managementDomainRateParamValues;

const managementDomainRateInsert = queryNumber => ` CALL managementDomainRateInsert(
    @managementDomainRateId_${queryNumber}, 
    @managementDomainId_${queryNumber}, 
    @managementDomainType_${queryNumber},
    @managementDomainRate_${queryNumber},
    @managementDomainRateOperator_${queryNumber},
    @mangementDomainRateByPercentage_${queryNumber}
    ); $$ `; // //////////////////////////////////////////////////////


exports.managementDomainRateInsert = managementDomainRateInsert;

const promoApplyParamValues = (queryNumber, id, domainType, domainId, promoId, startDate, endDate) => `SET 
      @appliedPromoId_${queryNumber} = ${id}, 
      @promoDomainType_${queryNumber} = '${domainType}',
      @promoDomainId_${queryNumber} = ${domainId},
      @promoId_${queryNumber} = ${promoId},
      @promoStartDate_${queryNumber} = '${startDate}',
      @promoEndDate_${queryNumber} = '${endDate}'
      ; $$`;

exports.promoApplyParamValues = promoApplyParamValues;

const promoApply = queryNumber => ` CALL promoApply(
    @appliedPromoId_${queryNumber}, 
    @promoDomainType_${queryNumber},
    @promoDomainId_${queryNumber},
    @promoId_${queryNumber},
    @promoStartDate_${queryNumber},
    @promoEndDate_${queryNumber}
    ); $$ `; // ///////////////////////////////////////////////////


exports.promoApply = promoApply;

const promoDeleteParamValues = (queryNumber, id, domainId) => `SET 
      @appliedPromoId_${queryNumber} = ${id},
      @promoDomainId_${queryNumber} = ${domainId}
      ; $$`;

exports.promoDeleteParamValues = promoDeleteParamValues;

const promoDelete = queryNumber => ` CALL promoDelete(
    @appliedPromoId_${queryNumber}, 
    @promoDomainId_${queryNumber}
    ); $$ `; // ////////////////////////////////////////


exports.promoDelete = promoDelete;

const promoUpdateParamValues = (queryNumber, id, domainType, startDate, endDate) => `SET 
      @appliedPromoId_${queryNumber} = ${id}, 
      @promoDomainType_${queryNumber} = '${domainType}',
      @promoStartDate_${queryNumber} = '${startDate}',
      @promoEndDate_${queryNumber} = '${endDate}'
      ; $$`;

exports.promoUpdateParamValues = promoUpdateParamValues;

const promoUpdate = queryNumber => ` CALL promoUpdate(
    @appliedPromoId_${queryNumber}, 
    @promoDomainType_${queryNumber},
    @promoStartDate_${queryNumber},
    @promoEndDate_${queryNumber}
    ); $$ `; // //////////////////////////////////////


exports.promoUpdate = promoUpdate;

const reservationAddonParamValues = (queryNumber, reservationId, serviceId, addonId) => `SET 
      @reservationId_${queryNumber} = ${reservationId}, 
      @serviceId_${queryNumber} = ${serviceId},
      @addonId_${queryNumber} = ${addonId}
      ); $$ `;

exports.reservationAddonParamValues = reservationAddonParamValues;

const reservationAddonDelete = queryNumber => ` CALL reservationAddonDelete(
    @reservationId_${queryNumber}, 
    @serviceId_${queryNumber},
    @addonId_${queryNumber}
    ); $$ `;

exports.reservationAddonDelete = reservationAddonDelete;

const reservationAddonInsert = queryNumber => ` CALL reservationAddonInsert(
    @reservationId_${queryNumber}, 
    @serviceId_${queryNumber},
    @addonId_${queryNumber}
    ); $$ `; // /////////////////////////////////////////


exports.reservationAddonInsert = reservationAddonInsert;

const reservationParamValues = (queryNumber, id, userId, addressId, status, initialDate, additionalNote) => `SET 
      @reservationId_${queryNumber} = ${id},
      @userId_${queryNumber} = ${userId},
      @addressId_${queryNumber} = ${addressId},
      @reservationStatus_${queryNumber} = ${status},
      @reservationInitialDate_${queryNumber} = '${initialDate}',
      @reservationAdditionalNote_${queryNumber} = '${additionalNote}'
      ; $$`;

exports.reservationParamValues = reservationParamValues;

const reservationInsert = queryNumber => ` CALL reservationInsert(
    @reservationId_${queryNumber}, 
    @userId_${queryNumber},
    @addressId_${queryNumber},
    @reservationStatus_${queryNumber},
    @reservationInitialDate_${queryNumber},
    @reservationAdditionalNote_${queryNumber}
    ); $$ `;

exports.reservationInsert = reservationInsert;

const reservationUpdate = queryNumber => ` CALL reservationUpdate(
    @reservationId_${queryNumber},
    @addressId_${queryNumber},
    @reservationStatus_${queryNumber},
    @reservationInitialDate_${queryNumber},
    @reservationAdditionalNote_${queryNumber}
    ); $$ `; // /////////////////////////////////


exports.reservationUpdate = reservationUpdate;

const serviceAddonParamValues = (queryNumber, serviceId, addonId) => `SET 
      @serviceId_${queryNumber} = ${serviceId},
      @addonId_${queryNumber} = ${addonId}
      ; $$`;

exports.serviceAddonParamValues = serviceAddonParamValues;

const serviceAddonDelete = queryNumber => ` CALL serviceAddonDelete(
    @serviceId_${queryNumber},
    @addonId_${queryNumber}
    ); $$ `; // ////////////////////////////////////////////


exports.serviceAddonDelete = serviceAddonDelete;

const userAccessLevelParamValues = (queryNumber, userId, userAccessLevelIsBasic, userAccessLevelIsProvider, userAccessLevelIsAdmin) => `SET 
      @userId_${queryNumber} = ${userId},
      @userAccessLevelIsBasic_${queryNumber} = ${userAccessLevelIsBasic},
      @userAccessLevelIsProvider_${queryNumber} = ${userAccessLevelIsProvider},
      @userAccessLevelIsAdmin_${queryNumber} = ${userAccessLevelIsAdmin}
      ); $$ `;

exports.userAccessLevelParamValues = userAccessLevelParamValues;

const userAccessLevelUpdate = queryNumber => ` CALL userAccessLevelUpdate(
    @userId_${queryNumber},
    @userAccessLevelIsBasic_${queryNumber},
    @userAccessLevelIsProvider_${queryNumber},
    @userAccessLevelIsAdmin_${queryNumber}
    ); $$ `; // ///////////////////////////////


exports.userAccessLevelUpdate = userAccessLevelUpdate;

const userAddressParamValues = (queryNumber, id, reservationId, recurrencyNumber = 'NULL') => `SET 
      @userId_${queryNumber} = ${id},
      @addressId_${queryNumber} = ${reservationId},
      @userAddressIsDefault_${queryNumber} = ${recurrencyNumber}
      ; $$`;

exports.userAddressParamValues = userAddressParamValues;

const userAddressDelete = queryNumber => ` CALL userAddressDelete(
    @userId_${queryNumber},
    @addressId_${queryNumber}
    ); $$ `;

exports.userAddressDelete = userAddressDelete;

const userAddressInsertOrUpdate = queryNumber => ` CALL userAddressInsertOrUpdate(
    @userId_${queryNumber},
    @addressId_${queryNumber},
    @userAddressIsDefault_${queryNumber}
    ); $$ `; // ////////////////////////////////////////////////////////


exports.userAddressInsertOrUpdate = userAddressInsertOrUpdate;

const userProviderAssignmentParamValues = (queryNumber, id, reservationId, recurrencyNumber) => `SET 
      @userProviderId_${queryNumber} = ${id},
      @reservationId_${queryNumber} = ${reservationId},
      @recurrencyNumber_${queryNumber} = ${recurrencyNumber}
      ; $$`;

exports.userProviderAssignmentParamValues = userProviderAssignmentParamValues;

const userProviderAssignmentDelete = queryNumber => ` CALL userProviderAssignmentDelete(
    @userProviderId_${queryNumber},
    @reservationId_${queryNumber},
    @recurrencyNumber_${queryNumber}
    ); $$ `;

exports.userProviderAssignmentDelete = userProviderAssignmentDelete;

const userProviderAssignmentInsert = queryNumber => ` CALL userProviderAssignmentInsert(
    @userProviderId_${queryNumber},
    @reservationId_${queryNumber},
    @recurrencyNumber_${queryNumber}
    ); $$ `; // /////////////////////////////////////////////////////


exports.userProviderAssignmentInsert = userProviderAssignmentInsert;

const userDomainParamValues = (queryNumber, id, firstname, lastname, dateOfBirth, gender, email, contactNumber) => `SET 
    @userId_${queryNumber} = ${id}, 
    @firstname_${queryNumber} = '${firstname}', 
    @lastname_${queryNumber} = '${lastname}', 
    @dateOfBirth_${queryNumber} = '${dateOfBirth}', 
    @gender_${queryNumber} = '${gender}', 
    @email_${queryNumber} = '${email}', 
    @contactNumber_${queryNumber} = '${contactNumber}'
    ; $$`;

exports.userDomainParamValues = userDomainParamValues;

const userInsert = queryNumber => ` CALL userInsert(
    @userId_${queryNumber},
    @firstname_${queryNumber},
    @lastname_${queryNumber},
    @dateOfBirth_${queryNumber},
    @gender_${queryNumber},
    @email_${queryNumber},
    @contactNumber_${queryNumber}
    ); $$ `;

exports.userInsert = userInsert;

const userUpdate = queryNumber => ` CALL userUpdate(
    @userId_${queryNumber},
    @firstname_${queryNumber},
    @lastname_${queryNumber},
    @dateOfBirth_${queryNumber},
    @gender_${queryNumber},
    @email_${queryNumber},
    @contactNumber_${queryNumber}
    ); $$ `;

exports.userUpdate = userUpdate;