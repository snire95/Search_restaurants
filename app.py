from flask import Flask
from flask import render_template
from flask import request, jsonify, make_response
import mysql.connector
import json
import datetime
import time



app = Flask(__name__)

mydb = mysql.connector.connect(
    host="four-in-a-row.cfvxrnptegvy.us-east-2.rds.amazonaws.com",
    user="admin",
    password="Bc1b1dc11",
    database="four_in_a_row"
)
cursor = mydb.cursor()  

@app.route('/')
def home():
    return render_template('game.html')

@app.route('/newRoom', methods=["POST"])
def saveName1(): 
    Parameters = request.get_json()
    sql = "INSERT INTO game (columnsG, rowsG, victoryScore, LastModifiedMounter, activePlayer, victory, name1) VALUES (%s, %s, %s, %s, %s, %s, %s)"
    val = (Parameters['columns'],
        Parameters['rows'], 
        Parameters['victoryScore'],
        Parameters['LastModifiedMounter'],
        Parameters['Player'],
        Parameters['victory'],
        Parameters['name1'] )
    cursor.execute(sql, val)
    mydb.commit()
    res = make_response(jsonify(cursor.lastrowid), 200)
    return res

@app.route("/id/<int:user_id>")
def openGmaeID(user_id):
    return render_template('room.html')

@app.route("/id/<int:user_id>/creatTable", methods=["POST"])
def openGmae(user_id):
    activePlayer = request.get_json()
    sql = "SELECT * FROM game WHERE id = %s"
    adr = (user_id ,)
    cursor.execute(sql, adr) 
    data = cursor.fetchall()
    if data != []:
        parameter = {
            "id": data[0][0],
            "rows" :  data[0][2],
            "columns" : data[0][1],
            "victoryScore" : data[0][3],
            "name1" : data[0][8],
            "victory": data[0][7],
            "Player" : data[0][6],
            "LastModifiedMounter" : data[0][4]
        }
        parameter = json.dumps(parameter)
        if activePlayer == "1" or activePlayer == "2":
            print(activePlayer)
        else :    
            nextActive = (data[0][6]) + 1
            print(nextActive)
            sql1 = "UPDATE game SET activePlayer = %s WHERE id = %s"
            val1 = (nextActive, user_id)
            cursor.execute(sql1, val1)
            mydb.commit()
        res = make_response(jsonify(parameter), 200)
        return res


@app.route('/id/<int:GameId>/SendInfo', methods=["POST"])
def SendInfo(GameId):
    start_time = time.time()
    NewTurn = request.get_json()
    cursor.execute("SELECT * FROM QueueTabl WHERE idGame = %s  ORDER BY ID DESC LIMIT 1;", (GameId ,) )
    LastTurn= cursor.fetchall()
    if LastTurn != []:
        if NewTurn['Player_id'] > 2 or NewTurn['Player_id'] < 1:
            print("activ player not 1 or 2")
            return ""   
        LastTurn = Person(LastTurn)   
        if LastTurn.PlayerId == NewTurn['Player_id']:
            print("active player Equal to Player_id")
            return ""
    sql ="INSERT INTO QueueTabl (idGame, Player_id, tr, td, victory) VALUES (%s, %s, %s, %s, %s)"
    val = (NewTurn['ID'], NewTurn['Player_id'],NewTurn['tr'], NewTurn['td'], NewTurn['victory'])
    cursor.execute(sql, val)
    mydb.commit()
    res = make_response(jsonify(NewTurn), 200)
    print (time.time() - start_time, 's')
    return res


@app.route("/id/<int:GameId>/NextTurn")
def NextTurn(GameId):
    mydb = mysql.connector.connect(
        host="four-in-a-row.cfvxrnptegvy.us-east-2.rds.amazonaws.com",
        user="admin",
        password="Bc1b1dc11",
        database="four_in_a_row"
    )
    cursor = mydb.cursor()  
    cursor.execute("SELECT * FROM QueueTabl WHERE idGame = %s  ORDER BY ID DESC LIMIT 1;", (GameId ,) )
    NewTurn = cursor.fetchall()
    if NewTurn != []:
        NewTurn = {
            "ID"  : ture[0][0],
            "idGame" : ture[0][1],
            "PlayerId" : ture[0][2],
            "tr" : ture[0][3],
            "td" : ture[0][4]
        }
        NewTurn = json.dumps(NewTurn)
        res = make_response(jsonify(NewTurn), 200)    
    else:
        res = make_response(jsonify([]), 200)   
    return res

@app.route('/id/<int:GameID>/GameRecovery')
def GameRecovery(GameID):
    mydb = mysql.connector.connect(
        host="four-in-a-row.cfvxrnptegvy.us-east-2.rds.amazonaws.com",
        user="admin",
        password="Bc1b1dc11",
        database="four_in_a_row"
    )
    cursor = mydb.cursor()  
    cursor.execute("SELECT * FROM QueueTabl WHERE idGame = %s ", (GameID ,) )
    AllTureArray = cursor.fetchall()
    if AllTureArray == []: 
        return make_response(jsonify([]), 200)   
    else: 
        list = [] 
        for x in AllTureArray:
            tureObj = {
                "ID"  : x[0],
                "idGame" : x[1],
                "PlayerId" : x[2],
                "tr" : x[3],
                "td" : x[4]
            }
            print(tureObj)
            list.append(tureObj)
        return make_response(jsonify(list), 200)     


@app.route('/id/<int:user_id>/save_name2', methods=["POST"])
def saveName2(user_id): 
    name2 = request.get_json()
    sql = "UPDATE game SET name2 = %s WHERE id = %s"
    val = (name2, user_id)
    cursor.execute(sql, val)
    mydb.commit()
    res = make_response(jsonify(name2), 200)
    return res

@app.route('/id/<int:user_id>/ViewName2')
def ViewName2(user_id):
    mydb = mysql.connector.connect(
        host="four-in-a-row.cfvxrnptegvy.us-east-2.rds.amazonaws.com",
        user="admin",
        password="Bc1b1dc11",
        database="four_in_a_row"
    )
    cursor = mydb.cursor()
    sql = "SELECT name2 FROM game WHERE id = %s"
    val = (user_id,)
    cursor.execute(sql, val)
    myresult = cursor.fetchall()
    name2 = myresult[0][0]
    res = make_response(jsonify(name2), 200)
    return res



if __name__ == "__main__":
    app.run(port=4998) 
    # app.run(host ='0.0.0.0') 

class Person:
    def __init__(self, x):
        self.ID = x[0][0]
        self.idGame = x[0][1]
        self.PlayerId = x[0][2]
        self.tr = x[0][3]
        self.td = x[0][4]
        self.victory = x[0][5]



