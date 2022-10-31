import cx_Oracle


connection = cx_Oracle.connect(
    user="",
    password="",
    dsn="//oracle.cise.ufl.edu/orcl")

print("Successfully connected to Oracle Database")

cursor = connection.cursor()

filenames = ["-Crash.sql", "-Unit.sql", "-Person.sql"]

#Be sure to run these commands before executing:
#DROP TABLE PERSON;
#DROP TABLE UNIT;
#DROP TABLE CRASH;
#create table CRASH (CRASH_ID number(8,0) not null,ACTIVE_SCHOOL_ZONE_FLAG char(1),AT_INTERSECTION char(1),CRASH_DEATH_COUNT number(3,0),CONSTRUCTION_ZONE_FLAG char(1),STOP_SIGN_FLAG char(1),YIELD_SIGN_FLAG char(1),TRAFFIC_CONTROL_TYPE number(2,0),DAY_OF_WEEK char(3),CRASH_TOTAL_INJURY_COUNT number(3,0),CRASH_TIME timestamp,CRASH_DATE date,CRASH_MONTH number(2,0),CRASH_YEAR number(4,0),primary key(CRASH_ID),CHECK(CRASH_ID>=0),CHECK(ACTIVE_SCHOOL_ZONE_FLAG='Y' OR ACTIVE_SCHOOL_ZONE_FLAG='N'),CHECK(AT_INTERSECTION='Y' OR AT_INTERSECTION='N'),CHECK(CRASH_DEATH_COUNT>=0),CHECK(CONSTRUCTION_ZONE_FLAG='Y' OR CONSTRUCTION_ZONE_FLAG='N'),CHECK(STOP_SIGN_FLAG='Y' OR STOP_SIGN_FLAG='N'),CHECK(YIELD_SIGN_FLAG='Y' OR YIELD_SIGN_FLAG='N'),CHECK(TRAFFIC_CONTROL_TYPE>=0),CHECK((DAY_OF_WEEK LIKE 'MON') OR (DAY_OF_WEEK LIKE 'TUE') OR (DAY_OF_WEEK LIKE 'WED') OR (DAY_OF_WEEK LIKE 'THU') OR (DAY_OF_WEEK LIKE 'FRI') OR (DAY_OF_WEEK LIKE 'SAT') OR (DAY_OF_WEEK LIKE 'SUN')),CHECK(CRASH_TOTAL_INJURY_COUNT>=0),CHECK(CRASH_MONTH>=0 AND CRASH_MONTH<=12),CHECK(CRASH_YEAR>=2012 AND CRASH_YEAR <=2022));
#create table UNIT (CRASH_ID number(8,0) not null,UNIT_NUMBER number(3,0) not null,DEATH_COUNT number(2,0),VEHICLE_MODEL_NAME number(4,0),VEHICLE_MAKE number(4,0),NOT_INJURED_COUNT number(3,0),TOTAL_INJURY_COUNT number(3,0),VEHICLE_MODEL_YEAR number(4,0),CONTRIBUTING_FACTOR_1 number(2,0),CONTRIBUTING_FACTOR_2 number(2,0),CONTRIBUTING_FACTOR_3 number(2,0),CMV_VEHICLE_TYPE number(2,0),DESCRIPTION number(2,0),primary key (CRASH_ID, UNIT_NUMBER),foreign key (CRASH_ID) references CRASH(CRASH_ID),CHECK(UNIT_NUMBER >= 0),CHECK(DEATH_COUNT >= 0),CHECK(VEHICLE_MODEL_NAME >= 0),CHECK(VEHICLE_MAKE >= 0),CHECK(NOT_INJURED_COUNT>=0),CHECK(TOTAL_INJURY_COUNT>=0),CHECK(VEHICLE_MODEL_YEAR>=0 AND VEHICLE_MODEL_YEAR<=2023),CHECK(CONTRIBUTING_FACTOR_1>=0),CHECK(CONTRIBUTING_FACTOR_2>=0), CHECK(CONTRIBUTING_FACTOR_3>=0),CHECK(CMV_VEHICLE_TYPE>=0),CHECK(DESCRIPTION>=0));
#create table PERSON (CRASH_ID number(8,0) not null,UNIT_NUMBER number(3,0) not null,PERSON_NUMBER number(3,0) not null,CITATION char(1),DIED char(1),AGE number(3,0),ETHNICITY number(2,0),GENDER number(2,0),NOT_INJURED char(1),primary key (CRASH_ID, UNIT_NUMBER, PERSON_NUMBER),foreign key (CRASH_ID, UNIT_NUMBER) references UNIT(CRASH_ID, UNIT_NUMBER),CHECK(PERSON_NUMBER>=0),CHECK (CITATION='Y' OR CITATION='N'),CHECK (DIED='Y' OR DIED='N'),CHECK (AGE >= 0 AND AGE <= 120),CHECK(ETHNICITY >= 0),CHECK(GENDER >= 0),CHECK(NOT_INJURED='Y' OR NOT_INJURED='N'));
i = 100
while i < 111:
    j = 0
    while j < 3:
        print("Starting year" + str(i) + filenames[j])
        file = open("year" + str(i) + filenames[j])
        z = 0
        while True:
            line = file.readline()
            if not line:
                break
            try:
                cursor.execute(line[:-2])
            except:
                print("Error executing SQL statement. Recovery: i = " + str(i) + "; j = " + str(j) + "; z = " + str(z))
            z += 1
        connection.commit()
        file.close()