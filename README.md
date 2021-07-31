<div align="center">
<img src='https://i.imgur.com/pJtXd5a.png'><br>

[![support](https://i.imgur.com/OgeQcJ2.png)](https://discord.gg/dHmF3nGntv)<br>

<a href="https://discord.com/oauth2/authorize?client_id=819316891062763540&scope=bot&permissions=4050113">click here to add wukong! to your server</a>     

</div>

---

> wukong! is currently being rewritten, therefore some of the info may be incorrect or not even present at all...

<h2 align="center">wukong!</h2>

wukong! is a free and open source discord bot built from scratch mainly for learning purposes but also focusing on user experience. basically all i think a bot needs is either already present or to be added in the future. uppercase makes wukong uncomfortable.

<h3>table of contents</h3>

- [commands](#commands)
- [contributing](#contributing)
    - [ideas](#ideas)
    - [coding](#coding)
    - [reporting bugs](#reporting-bugs)
    - [translation](#translation)
- [self-hosting](#self-hosting) 

<h2 align="center">commands</h2>

a docs with all commands is currently being written, please be patient.

also, i didn't set up music commands yet! but they are 100% guaranteed to be a feature in the future.

<h2 align="center">contributing</h2>

### ideas

you got an idea? feel free to [open an issue](https://github.com/Caslus/wukong/issues/new) describing your idea, i'll take a look at it and consider adding it to the bot, make sure to take a look at the [issues](https://github.com/Caslus/wukong/issues/) to make sure no one suggested it before.

### coding

you can [fork](https://github.com/Caslus/wukong/fork) wukong! and make your changes to it, then open a pull request, if i find it appropriate and good enough i'll accept it.

> keep in mind that your code might not be accepted, this depends on a lot of stuff, contact me on discord if you have any questions regarding this.

### reporting bugs

you can report a bug by writing a [bug report](https://github.com/Caslus/wukong/issues/new?assignees=Caslus&labels=bug&template=bug-report.md&title=%5Bbug%5D), please give me as much information as you can!

### translation

you can contribute to the bot by translating it to another language or improving already existing sentences, check out the `locale.json` file, the structure is really simple, so it is really easy for wukong! to get any sentence in any language. if you are going to create the translation for a new language, copy the english object "en" and paste it at the bottom of the document, there you can edit "en" to another language code, and perform the translation for all the sentences.

> make sure to leave all punctuation as is, if there are ` around a word, keep them in the translation, if there is a : at the end of the sentence, keep it in the translation.

<h2 align="center">self-hosting</h2>

keep in mind that wukong! is hosted 24/7 and if you don't pretend to make any changes to its code you can invite it to your server using this <a href="https://discord.com/oauth2/authorize?client_id=819316891062763540&scope=bot&permissions=4050113">url</a>.<br>

> please be aware that if you do self-host wukong! i won't be able to provide support, also, take a look at the [license](https://github.com/Caslus/wukong/blob/main/LICENSE).

if you really wish to self-host wukong!, clone this repository by using

    git clone https://github.com/Caslus/wukong.git

after you're done, you have to install wukong!'s dependencies, which may take a while depending on your connection. navigate to the repository folder and install the dependencies using

    npm install

you can now edit edit the `config.template.json` file, setting your tokens and a few other configuration values, remember to edit the file name to `config.json` once you're done.<br>
finally, run wukong! using

    npm start
