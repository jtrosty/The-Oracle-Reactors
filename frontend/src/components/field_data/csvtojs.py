import pandas as pd

labels = pd.read_csv("CommercialVehicleType.csv")

output = "const labels = ["

for index, row in labels.iterrows():
    output += "{label: \"" + str(row[1]) + "\", value:\"" + str(row[0]) + "\"}, "
   
output = output[:-2] + "];"

print(output)