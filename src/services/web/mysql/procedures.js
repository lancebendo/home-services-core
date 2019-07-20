/* eslint-disable no-tabs */
/**

sample script is:
    CALL promoApply(@promoId, 'user', 1000045, 1000001, CURDATE(), CURDATE()); $$

addressInsert
    OUT _id	int
    IN	_province	varchar
    IN	_city	varchar
    IN	_barangay	varchar
    IN	_room_number	varchar
    IN	_bldg_number	varchar
    IN	_zip	int
    IN	_landmark	varchar

addressUpdate
    IN	_id	int
    IN	_province	varchar
    IN	_city	varchar
    IN	_barangay	varchar
    IN	_room_number	varchar
    IN	_bldg_number	varchar
    IN	_zip	int
    IN	_landmark	varchar

completedSessionAddonDelete
    IN	_completed_session_id	int
    IN	_service_id	int
    IN	_addon_id	int

completedSessionInsert
    OUT	_id	int
    IN	_reservation_id	int
    IN	_recurrency_number	smallint
    IN	_date	date
    IN	_note	varchar

completedSessionServiceAddonInsert
    IN	_completed_session_id	int
    IN	_service_id	int
    IN	_addon_id	int

completedSessionUpdateNote
    IN	_id	int
    IN	_note	varchar

isActiveUpdate
    IN	_domain	varchar
    IN	_id	int
    IN	_is_active	tinyint

managementDomainInsert
    OUT	_id	int
    IN	_management_domain_type	varchar
    IN	_name	varchar
    IN	_description	varchar

managementDomainRateInsert
    OUT	_id	int
    IN	_domain_id	int
    IN	_management_domain_type	varchar
    IN	_rate	varchar
    IN	_operator	smallint
    IN	_by_percentage	tinyint

managementDomainUpdate
    IN	_id	int
    IN	_management_domain_type	varchar
    IN	_name	varchar
    IN	_description	varchar

promoApply
    OUT	_id	int
    IN	_promo_domain	varchar
    IN	_promo_domain_id	varchar
    IN	_promo_id	varchar
    IN	_start_date	date
    IN	_end_date	date

promoDelete
    IN	_id	int
    IN	_promo_domain	varchar

promoUpdate
    IN	_id	int
    IN	_promo_domain	varchar
    IN	_start_date	date
    IN	_end_date	date

reservationAddonDelete
    IN	_reservation_id	int
    IN	_service_id	int
    IN	_addon_id	int

reservationAddonInsert
    IN	_reservation_id	int
    IN	_service_id	int
    IN	_addon_id	int

reservationInsert
    OUT	_id	int
    IN	_user_id	int
    IN	_address_id	int
    IN	_status	int
    IN	_initial_date	date
    IN	_additional_note	varchar

reservationUpdate
    IN	_id	int
    IN	_address_id	int
    IN	_status	int
    IN	_initial_date	date
    IN	_additional_note	varchar

serviceAddonDelete
    IN	_service_id	int
    IN	_addon_id	int

userAccessLevelUpdate
    IN	_user_id	int
    IN	_is_basic	tinyint
    IN	_is_provider	tinyint
    IN	_is_admin	tinyint

userAddressDelete
    IN	_user_id	int
    IN	_address_id	int

userAddressInsertOrUpdate
    IN	_user_id	int
    IN	_address_id	int
    IN	_is_default	tinyint

userInsert
    OUT	_id	int
    IN	_firstname	varchar
    IN	_lastname	varchar
    IN	_date_of_birth	date
    IN	_gender	tinyint
    IN	_email	varchar
    IN	_contact_number	varchar

userProviderAssignmentDelete
    IN	_user_provider_id	int
    IN	_reservation_id	int
    IN	_recurrency_number	tinyint

userProviderAssignmentInsert
    IN	_user_provider_id	int
    IN	_reservation_id	int
    IN	_recurrency_number	tinyint

userUpdate
    IN	_id	int
    IN	_firstname	varchar
    IN	_lastname	varchar
    IN	_date_of_birth	date
    IN	_gender	tinyint
    IN	_email	varchar
    IN	_contact_number	varchar

 */
