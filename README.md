# Task_1

Клонировать репозиторий командой git clone https://github.com/sandoreno/Task_1.git 

Для запуска UI:
1. Установить node версии 18.17.1
2. Запустить консоль на уровне папки Task01.UI
3. Прописать npm i --force
4. Прописать npm start


Инструкция к fastAPI:
1. Скачать python
2. Запустить консоль на уровке папки fastAPI
3. Прописать команду python -m venv lct_venv
4. Активировать вирт. окружение, прописав в консоль .\lct_venv\Scripts\activate
5. Прописать команду pip install-- upgrade pip (команда обновления пакетного менеджера)
6. Прописать команду pip install -r requirements.txt (для установки библиотек из файла)
7. После установки библиотек, запускаем сервер из окружения lct_venv командой
uvicorn py.inference:app --reload
