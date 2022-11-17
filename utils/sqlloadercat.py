import pandas as pd
import zipfile
import os
import math

def unzipDirectory(sourceZip, targetDirectory):
    with zipfile.ZipFile(sourceZip, 'r') as zipr:
       zipr.extractall(targetDirectory)
       
def binaryToBoolChar(num):
    if num == 1:
        return "Y" 
    elif num == 0:
        return "N"
    elif num == "Y":
        return "Y" 
    elif num == "N":
        return "N"
    else:
        return "NULL"
        
def strOrNull(conv):
    if conv == None or (isinstance(conv, float) and math.isnan(conv)):
        return "NULL"
    else:
        return str(conv)
       
def formatCrashTime(ct):
    if isinstance(ct, str):
        if (len(ct) == 8):
            hour = int(ct[:2])
            minute = ct[3:5]
            suffix = ct[6:8]
            if(suffix == "PM" and hour != 12):
                hour += 12
            if(hour == 12 and suffix == "AM"):
                hour = 0
            if(math.floor(hour / 10) == 0):
                hour = "0" + str(hour)
            else:
                hour = str(hour)
            return hour + ":" + minute
        elif (len(ct) == 7):
            hour = int(ct[:1])
            minute = ct[2:4]
            suffix = ct[5:7]
            if(suffix == "PM" and hour != 12):
                hour += 12
            if(hour == 12 and suffix == "AM"):
                hour = 0
            if(math.floor(hour / 10) == 0):
                hour = "0" + str(hour)
            else:
                hour = str(hour)
            return hour + ":" + minute
        else:
            return "NULL"
    else:
        return "NULL"

def formatCrashDate(cd):
    if isinstance(cd, str):
        return cd
    else:
        return "NULL"
       
def buildCrashEntry(cid, aszf, ai, cdc, czf, ssf, ysf, tct, dow, ctic, ct, cd, cm, cy):
    command = strOrNull(cid) + "," #CID
    command += binaryToBoolChar(aszf) + "," #ASZF
    command += binaryToBoolChar(ai) + "," #AI
    command += strOrNull(cdc) + "," #CDC
    command += binaryToBoolChar(czf) + "," #CZF
    command += binaryToBoolChar(ssf) + "," #SSF
    command += binaryToBoolChar(ysf) + "," #YSF
    command += strOrNull(tct) + "," #TCT
    command += (dow or "NULL") + "," #DOW
    command += strOrNull(ctic) + "," #CTIC
    command += formatCrashTime(ct) + "," #CT
    command += formatCrashDate(cd) + "," #CD
    command += strOrNull(cm) + "," #CM
    command += strOrNull(cy) + ",\n" #CY
    return command;

def buildCrash(root, files, outfilenamebase):
    crashsql = open(outfilenamebase + "-Crash.cat", "w")

    crashfilename = None
    for testfile in files:
        if "crash" in testfile and ".csv" in testfile:
            crashfilename = testfile
    crashdata = pd.read_csv(root + "\\" + crashfilename)
    
    crashdata = crashdata[["Crash_ID", "Active_School_Zone_Fl", "At_Intrsct_Fl", "Death_Cnt", "Road_Constr_Zone_Fl", "Traffic_Cntl_ID", "Day_of_Week", "Tot_Injry_Cnt", "Crash_Time", "Crash_Date"]]
    
    for index, row in crashdata.iterrows():
        stop_flag = "N"
        yield_flag = "N"
        if(row["Traffic_Cntl_ID"] == 8):
            stop_flag = "Y"
        if(row["Traffic_Cntl_ID"] == 9):
            yield_flag = "Y"
        
        datesplit = row["Crash_Date"].split('/')
        month = datesplit[0]
        year = datesplit[2]
        
        crashentry = buildCrashEntry(row["Crash_ID"], row["Active_School_Zone_Fl"], row["At_Intrsct_Fl"], row["Death_Cnt"], row["Road_Constr_Zone_Fl"], stop_flag, yield_flag, row["Traffic_Cntl_ID"], row["Day_of_Week"], row["Tot_Injry_Cnt"], row["Crash_Time"], row["Crash_Date"], month, year)
        crashsql.write(crashentry)
        
    crashsql.close()

def buildUnitEntry(cid, un, dc, vmn, vm, nic, tic, vmy, cf1, cf2, cf3, cvt, d):
    command = strOrNull(cid) + "," #CID
    command += strOrNull(un) + "," #UN
    command += strOrNull(dc) + "," #DC
    command += strOrNull(vmn) + "," #VMN
    command += strOrNull(vm) + "," #VM
    command += strOrNull(nic) + "," #NIC
    command += strOrNull(tic) + "," #TIC
    command += strOrNull(vmy) + "," #VMY
    command += strOrNull(cf1) + "," #CF1
    command += strOrNull(cf2) + "," #CF2
    command += strOrNull(cf3) + "," #CF3
    command += strOrNull(cvt) + "," #CVT
    command += strOrNull(d) + ",\n" #D
    return command

def buildUnit(root, files, outfilenamebase):
    unitsql = open(outfilenamebase + "-Unit.cat", "w")

    unitfilename = None
    for testfile in files:
        if "unit" in testfile and ".csv" in testfile:
            unitfilename = testfile
    unitdata = pd.read_csv(root + "\\" + unitfilename)
    
    unitdata = unitdata[["Crash_ID", "Unit_Nbr", "Death_Cnt", "Veh_Mod_ID", "Veh_Make_ID", "Non_Injry_Cnt", "Tot_Injry_Cnt", "Veh_Mod_Year", "Contrib_Factr_1_ID", "Contrib_Factr_2_ID", "Contrib_Factr_3_ID", "Cmv_Veh_Type_ID", "Unit_Desc_ID"]]
    
    for index, row in unitdata.iterrows():
        unitentry = buildUnitEntry(row["Crash_ID"], row["Unit_Nbr"], row["Death_Cnt"], row["Veh_Mod_ID"], row["Veh_Make_ID"], row["Non_Injry_Cnt"], row["Tot_Injry_Cnt"], row["Veh_Mod_Year"], row["Contrib_Factr_1_ID"], row["Contrib_Factr_2_ID"], row["Contrib_Factr_3_ID"], row["Cmv_Veh_Type_ID"], row["Unit_Desc_ID"])
        unitsql.write(unitentry)
        
    unitsql.close()

def buildPersonEntry(cid, un, pn, c, d, a, e, g, ni):
    command = strOrNull(cid) + "," #CID
    command += strOrNull(un) + "," #UN
    command += strOrNull(pn) + "," #PN
    command += binaryToBoolChar(c) + "," #C
    command += binaryToBoolChar(d) + "," #D
    command += strOrNull(a) + "," #A
    command += strOrNull(e) + "," #E
    command += strOrNull(g) + "," #G
    command += binaryToBoolChar(ni) + ",\n" #NI
    return command

def buildPerson(root, files, outfilenamebase):
    personsql = open(outfilenamebase + "-Person.cat", "w")

    personfilename1 = None
    personfilename2 = None
    personfilename3 = None
    for testfile in files:
        if "primaryperson" in testfile and ".csv" in testfile:
            personfilename1 = testfile
        if "person" in testfile and not "primaryperson" in testfile and ".csv" in testfile:
            personfilename3 = testfile
        if "charges" in testfile and ".csv" in testfile:
            personfilename2 = testfile
    persondata = pd.read_csv(root + "\\" + personfilename1)
    persondata2 = pd.read_csv(root + "\\" + personfilename2)
    persondata3 = pd.read_csv(root + "\\" + personfilename3)
    
    persondata = persondata[["Crash_ID", "Unit_Nbr", "Prsn_Nbr", "Death_Cnt", "Prsn_Age", "Prsn_Ethnicity_ID", "Prsn_Gndr_ID", "Non_Injry_Cnt"]]
    persondata2 = persondata2[["Crash_ID", "Unit_Nbr", "Prsn_Nbr", "Citation_Nbr"]]
    persondata3 = persondata3[["Crash_ID", "Unit_Nbr", "Prsn_Nbr", "Death_Cnt", "Prsn_Age", "Prsn_Ethnicity_ID", "Prsn_Gndr_ID", "Non_Injry_Cnt"]]
    persondata.set_index(["Crash_ID", "Unit_Nbr", "Prsn_Nbr"], inplace=True)
    persondata2.set_index(["Crash_ID", "Unit_Nbr", "Prsn_Nbr"], inplace=True)
    persondata3.set_index(["Crash_ID", "Unit_Nbr", "Prsn_Nbr"], inplace=True)
    persondata = pd.concat([persondata, persondata3], axis=0)
    persondata = persondata.merge(persondata2, on=["Crash_ID", "Unit_Nbr", "Prsn_Nbr"], how='left')
    
    persondata = persondata[~persondata.index.duplicated(keep='first')]
    
    for index, row in persondata.iterrows():
        citation = "Y"

        if (isinstance(row["Citation_Nbr"], float) and math.isnan(row["Citation_Nbr"])):
            citation = "N"
        
        died = "N"
        if row["Death_Cnt"] > 0:
            died = "Y"
        
        notinjured = "N"
        if row["Non_Injry_Cnt"] > 0:
            notinjured = "Y"
    
        personentry = buildPersonEntry(index[0], index[1], index[2], citation, died, row["Prsn_Age"], row["Prsn_Ethnicity_ID"], row["Prsn_Gndr_ID"], notinjured)
        personsql.write(personentry)
        
    personsql.close()

def createSubYearFiles(root, files, outfilenamebase):
    buildCrash(root, files, outfilenamebase)
    buildUnit(root, files, outfilenamebase)
    buildPerson(root, files, outfilenamebase)

def createYearFiles(root, files, outfilenamebase):
    crashsql = open(outfilenamebase + "-Crash.csv", "w")
    
    for attrfile in files:
        if not ".cat" in attrfile or not "Crash" in attrfile:
            continue
        with open(root + "\\" + attrfile, "r") as subcrashsql:
            crashsql.write(subcrashsql.read())
            subcrashsql.close()
    crashsql.close()
    
    unitsql = open(outfilenamebase + "-Unit.csv", "w")
    
    for attrfile in files:
        if not ".cat" in attrfile or not "Unit" in attrfile:
            continue
        with open(root + "\\" + attrfile, "r") as subunitsql:
            unitsql.write(subunitsql.read())
            subunitsql.close()
    unitsql.close()
    
    personsql = open(outfilenamebase + "-Person.csv", "w")
    
    for attrfile in files:
        if not ".cat" in attrfile or not "Person" in attrfile:
            continue
        with open(root + "\\" + attrfile, "r") as subpersonsql:
            personsql.write(subpersonsql.read())
            subpersonsql.close()
    personsql.close()

#Test   
#print(buildCrashEntry(1,1,1,0,0,2,0,5,"MON",0,"12:00 AM","12/22/13",12,2013))

#Main Loop
maincwd = os.getcwd()
j = 100
for x in os.listdir(maincwd):
    if "." in x or "FINAL_OUTPUT" in x:
        continue
    if "year" + str(j) + "-Crash.cat" in os.listdir(maincwd) and "year" + str(j) + "-Unit.cat" in os.listdir(maincwd) and "year" + str(j) + "-Person.cat" in os.listdir(maincwd):
        continue
    inyearcwd = maincwd + "\\" + x
    i = 100
    for y in os.listdir(inyearcwd):
        if not ".zip" in y:
            continue
        if "subyear" + str(i) + "-Crash.cat" in os.listdir(inyearcwd) and "subyear" + str(i) + "-Unit.cat" in os.listdir(inyearcwd) and "subyear" + str(i) + "-Person.cat" in os.listdir(inyearcwd):
            continue
        f = inyearcwd + "\\" + y
        f = f.replace(".zip", "")
        unzipDirectory(inyearcwd + "\\" + y, f)
        basecsvs = os.listdir(f)
        createSubYearFiles(f, basecsvs, inyearcwd + "\\subyear" + str(i))
        i += 1
    eachsubyear = os.listdir(inyearcwd)
    createYearFiles(inyearcwd, eachsubyear, maincwd + "\\FINAL_OUTPUT\\year" + str(j))
    j += 1

sqlschema = open(maincwd + "\\FINAL_OUTPUT\\schemas.sql", "w")
sqlschema.write("create table CRASH (CRASH_ID number(8,0) not null,ACTIVE_SCHOOL_ZONE_FLAG char(1),AT_INTERSECTION char(1),CRASH_DEATH_COUNT number(3,0),CONSTRUCTION_ZONE_FLAG char(1),STOP_SIGN_FLAG char(1),YIELD_SIGN_FLAG char(1),TRAFFIC_CONTROL_TYPE number(2,0),DAY_OF_WEEK char(3),CRASH_TOTAL_INJURY_COUNT number(3,0),CRASH_TIME timestamp,CRASH_DATE date,CRASH_MONTH number(2,0),CRASH_YEAR number(4,0),primary key(CRASH_ID),CHECK(CRASH_ID>=0),CHECK(ACTIVE_SCHOOL_ZONE_FLAG='Y' OR ACTIVE_SCHOOL_ZONE_FLAG='N'),CHECK(AT_INTERSECTION='Y' OR AT_INTERSECTION='N'),CHECK(CRASH_DEATH_COUNT>=0),CHECK(CONSTRUCTION_ZONE_FLAG='Y' OR CONSTRUCTION_ZONE_FLAG='N'),CHECK(STOP_SIGN_FLAG='Y' OR STOP_SIGN_FLAG='N'),CHECK(YIELD_SIGN_FLAG='Y' OR YIELD_SIGN_FLAG='N'),CHECK(TRAFFIC_CONTROL_TYPE>=0),CHECK((DAY_OF_WEEK LIKE 'MON') OR (DAY_OF_WEEK LIKE 'TUE') OR (DAY_OF_WEEK LIKE 'WED') OR (DAY_OF_WEEK LIKE 'THU') OR (DAY_OF_WEEK LIKE 'FRI') OR (DAY_OF_WEEK LIKE 'SAT') OR (DAY_OF_WEEK LIKE 'SUN')),CHECK(CRASH_TOTAL_INJURY_COUNT>=0),CHECK(CRASH_MONTH>=0 AND CRASH_MONTH<=12),CHECK(CRASH_YEAR>=2012 AND CRASH_YEAR <=2022));\n")
sqlschema.write("create table UNIT (CRASH_ID number(8,0) not null,UNIT_NUMBER number(3,0) not null,DEATH_COUNT number(2,0),VEHICLE_MODEL_NAME number(4,0),VEHICLE_MAKE number(4,0),NOT_INJURED_COUNT number(3,0),TOTAL_INJURY_COUNT number(3,0),VEHICLE_MODEL_YEAR number(4,0),CONTRIBUTING_FACTOR_1 number(2,0),CONTRIBUTING_FACTOR_2 number(2,0),CONTRIBUTING_FACTOR_3 number(2,0),CMV_VEHICLE_TYPE number(2,0),DESCRIPTION number(2,0),primary key (CRASH_ID, UNIT_NUMBER),foreign key (CRASH_ID) references CRASH(CRASH_ID),CHECK(UNIT_NUMBER >= 0),CHECK(DEATH_COUNT >= 0),CHECK(VEHICLE_MODEL_NAME >= 0),CHECK(VEHICLE_MAKE >= 0),CHECK(NOT_INJURED_COUNT>=0),CHECK(TOTAL_INJURY_COUNT>=0),CHECK(VEHICLE_MODEL_YEAR>=0 AND VEHICLE_MODEL_YEAR<=2023),CHECK(CONTRIBUTING_FACTOR_1>=0),CHECK(CONTRIBUTING_FACTOR_2>=0), CHECK(CONTRIBUTING_FACTOR_3>=0),CHECK(CMV_VEHICLE_TYPE>=0),CHECK(DESCRIPTION>=0));\n")
sqlschema.write("create table PERSON (CRASH_ID number(8,0) not null,UNIT_NUMBER number(3,0) not null,PERSON_NUMBER number(3,0) not null,CITATION char(1),DIED char(1),AGE number(3,0),ETHNICITY number(2,0),GENDER number(2,0),NOT_INJURED char(1),primary key (CRASH_ID, UNIT_NUMBER, PERSON_NUMBER),foreign key (CRASH_ID, UNIT_NUMBER) references UNIT(CRASH_ID, UNIT_NUMBER),CHECK(PERSON_NUMBER>=0),CHECK (CITATION='Y' OR CITATION='N'),CHECK (DIED='Y' OR DIED='N'),CHECK (AGE >= 0 AND AGE <= 120),CHECK(ETHNICITY >= 0),CHECK(GENDER >= 0),CHECK(NOT_INJURED='Y' OR NOT_INJURED='N'));\n")
sqlschema.close()