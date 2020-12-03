from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import os

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/ping', methods=['GET'])
@cross_origin()
def pong():
    return 'pong'

@app.route('/censorText', methods=['POST'])
@cross_origin()
def censorText():
    print(request.json)
    return request.json

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))