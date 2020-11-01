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
@app.route('/')
def home():

    return render_template('game.html')

@app.route('/newRoom', methods=["POST"])
def saveName1(): 
    Parameters = request.get_json()
    cursor = mydb.cursor()
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

@app.route("/id/<int:user_id>/creatTable")
def openGmae(user_id):
    cursor = mydb.cursor()
    sql = "SELECT * FROM game WHERE id = %s"
    adr = (user_id ,)
    cursor.execute(sql, adr) 
    myresult = cursor.fetchall()
    activeN = (myresult[0][6])+1
    sql1 = "UPDATE game SET activePlayer = %s WHERE id = %s"
    val1 = (activeN, user_id)
    cursor.execute(sql1, val1)
    mydb.commit()
    res = make_response(jsonify(myresult), 200)
    return res


@app.route('/id/<int:user_id>/SendInfo', methods=["POST"])
def SendInfo(user_id):
    Parameters = request.get_json()
    x = datetime.datetime.now()
    cursor = mydb.cursor() 
    sql ="INSERT INTO GameProgress1 (ID, Player_id, step, Location, Knowing) VALUES (%s, %s, %s, %s, %s)"
    val = (Parameters['ID'], Parameters['Player_id'], x, str(Parameters['Location']), 0)
    cursor.execute(sql, val)
    mydb.commit()
    res = make_response(jsonify(Parameters), 200)
    print("Info")
    print(Parameters)
    return res


@app.route("/id/<int:user_id>/startGame")
def startGame(user_id):
    mydb = mysql.connector.connect(
        host="four-in-a-row.cfvxrnptegvy.us-east-2.rds.amazonaws.com",
        user="admin",
        password="Bc1b1dc11",
        database="four_in_a_row"
    )
    start_time = time.time()
    cursor = mydb.cursor()  
    cursor.execute("SELECT * FROM GameProgress1 WHERE ID = %s  ORDER BY step DESC LIMIT 1;", (user_id ,) )
    myresult = cursor.fetchall()
    # print(myresult1)
    # if myresult != [] :
    #     sql1 = "UPDATE GameProgress1 SET knowing = %s WHERE step = %s"
    #     limit1 = (myresult[0][4]) + 1
    #     print(limit1)
    #     date = myresult[0][2]
    #     val1 = (limit1, date)
    #     cursor.execute(sql1, val1)
    #     mydb.commit()
    res = make_response(jsonify(myresult), 200)
    print(myresult)
    print (time.time() - start_time, 's')
    return res


@app.route('/id/<int:user_id>/save_name2', methods=["POST"])
def saveName2(user_id): 
    name2 = request.get_json()
    cursor = mydb.cursor()
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




