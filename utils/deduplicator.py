import pandas

filenames = ["-Crash.csv", "-Unit.csv", "-Person.csv"]

i = 100
while i < 111:
    j = 0
    
    print("Starting year" + str(i) + filenames[j])
    data = pandas.read_csv("year" + str(i) + filenames[j])
    data.set_index(["Crash_ID"], inplace=True)
    data = data[~data.index.duplicated(keep='first')]
    
    pandas.write_csv("dedup-year" + str(i) + filenames[j]);
    
    j = 1
    
    print("Starting year" + str(i) + filenames[j])
    data = pandas.read_csv("year" + str(i) + filenames[j])
    data.set_index(["Crash_ID", "Unit_Nbr"], inplace=True)
    data = data[~data.index.duplicated(keep='first')]
    
    pandas.write_csv("dedup-year" + str(i) + filenames[j]);
    
    j = 2
    
    print("Starting year" + str(i) + filenames[j])
    data = pandas.read_csv("year" + str(i) + filenames[j])
    data.set_index(["Crash_ID", "Unit_Nbr", "Prsn_Nbr"], inplace=True)
    data = data[~data.index.duplicated(keep='first')]
    
    pandas.write_csv("dedup-year" + str(i) + filenames[j]);