DELIMITER $$;

DROP USER IF EXISTS 'readonly_hs_user'@'%'; 

CREATE USER 'readonly_hs_user'@'%' 
IDENTIFIED BY 'password';

GRANT SELECT ON home_services.*
TO 'readonly_hs_user'@'%'
WITH GRANT OPTION;


DROP USER IF EXISTS 'writer_hs_user'@'%';

CREATE USER 'writer_hs_user'@'%' 
IDENTIFIED BY 'password';

GRANT INSERT, 
UPDATE, DELETE, 
EXECUTE ON home_services.*
 TO 'writer_hs_user'@'%' 
 WITH GRANT OPTION;

SELECT sql_grants FROM home_services.sql_show_grants WHERE user='writer_hs_user';
