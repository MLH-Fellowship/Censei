# -*- coding: utf-8 -*-
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import os
from better_profanity import profanity
import random

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

emojis = "🍏 🍎 🍐 🍊 🍋 🍌 🍉 🍇 🍓 🍈 🍒 🍑 🍍 🥝 🍅 🍆 🥑 🥒 🌶 🌽 🥕 🥔 🍠 🥐 🍞 🥖 🧀 🥚 🍳 🥞 🥓 🍗 🍖 🌭 🍔 🍟 🍕 🥙 🌮 🌯 🥗 🥘 🍝 🍜 🍲 🍛 🍣 🍱 🍤 🍙 🍚 🍘 🍥 🍢 🍡 🍧 🍨 🍦 🍰 🎂 🍮 🍭 🍬 🍫 🍿 🍩 🍪 🌰 🥜 🍯 🥛 🍼 🍵 🍶 🍺 🍻 🥂 🍷 🥃 🍸 🍹 🍾".split(' ')

@app.route('/ping', methods=['GET'])
@cross_origin()
def pong():
    return 'pong'

@app.route('/censorText', methods=['POST'])
@cross_origin()
def censorText():
    text = request.json.get('text', '')
    whitelist = request.json.get('white_list', [])
    censorlist = request.json.get('censor_list', [])
    profanity.load_censor_words(whitelist_words=whitelist)
    profanity.add_censor_words(censorlist)
    words = text.split(' ')
    censored_text = ''
    for word in words:
        censored_text += (" " + (profanity.censor(word, censor_char=random.choice(emojis))))
    return { "censored_text": censored_text }

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))