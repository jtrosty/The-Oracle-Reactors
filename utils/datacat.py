import pandas as pd
import zipfile
import os

def unzipDirectory(sourceZip, targetDirectory):
    with zipfile.ZipFile(sourceZip, 'r') as zipr:
       zipr.extractall(targetDirectory)
       
def createSubYearFile(root, files, outfilename):
    opensubyearfile = open(outfilename, "w")
    opensubyearfile.close()

    i = 0
    for testfile in files:
        if not ".csv" in testfile:
            i += 1
        else:
            break

    subyearfiledata = pd.read_csv(root + "\\" + files[i])

    for attrfile in files:
        if attrfile == files[i]:
            continue
        if not ".csv" in attrfile: 
            continue
        print("Currently concatenating: " + attrfile)
        elementfiledata = pd.read_csv(root + "\\" + attrfile)
        subyearfiledata = pd.concat([subyearfiledata, elementfiledata], axis=1)

    print("Writing...")
    subyearfiledata.to_csv(outfilename)

def createYearFile(root, files, outfilename):
    opensubyearfile = open(outfilename, "w")
    opensubyearfile.close()

    i = 0
    for testfile in files:
        if not ".cat" in testfile:
            i += 1
        else:
            break

    subyearfiledata = pd.read_csv(root + "\\" + files[i])

    for attrfile in files:
        if attrfile == files[i]:
            continue
        if not ".cat" in attrfile: 
            continue
        print("Currently concatenating: " + attrfile)
        elementfiledata = pd.read_csv(root + "\\" + attrfile)
        subyearfiledata = pd.concat([subyearfiledata, elementfiledata], axis=0)

    print("Writing...")
    subyearfiledata.to_csv(outfilename)
    
def createFinalFile(root, files, outfilename):
    opensubyearfile = open(outfilename, "w")
    opensubyearfile.close()

    i = 0
    for testfile in files:
        if not ".cat" in testfile:
            i += 1
        else:
            break

    subyearfiledata = pd.read_csv(root + "\\" + files[i])

    for attrfile in files:
        if attrfile == files[i]:
            continue
        if not ".cat" in attrfile: 
            continue
        print("Currently concatenating: " + attrfile)
        elementfiledata = pd.read_csv(root + "\\" + attrfile)
        subyearfiledata = pd.concat([subyearfiledata, elementfiledata], axis=0)

    print("Writing...")
    subyearfiledata.to_csv(outfilename)

initcwd = os.getcwd()
j = 100
for x in os.listdir(initcwd):
    cwd = os.getcwd()
    temp = ""
    if "." in x:
        continue
    if "year" + str(j) + ".cat" in os.listdir(cwd):
        j = j + 1
        continue
    temp = cwd
    cwd = cwd + "\\" + x
    i = 100
    for y in os.listdir(cwd):
        if not ".zip" in y:
            continue
        if "subyear" + str(i) + ".cat" in os.listdir(cwd) and "." in y:
            i = i + 1
            continue
        f = cwd + "\\" + y
        f = f.replace(".zip", "")
        unzipDirectory(cwd + "\\" + y, f)
        basecsvs = os.listdir(f)
        createSubYearFile(f, basecsvs, cwd + "\\subyear" + str(i) + ".cat")
        i += 1
    cwd = temp + "\\" + x
    eachsubyear = os.listdir(cwd)
    createYearFile(cwd, eachsubyear, temp + "\\year" + str(j) + ".cat")
    j += 1
eachyear = os.listdir(os.getcwd())
createFinalFile(os.getcwd(), eachyear, os.getcwd() + "\\final_data.csv")
        
                    
                