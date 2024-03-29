<div align="center">
<img src='https://i.imgur.com/pJtXd5a.png'><br>

[![support](https://i.imgur.com/OgeQcJ2.png)](https://discord.gg/dHmF3nGntv)<br>

<a href="https://discord.com/oauth2/authorize?client_id=819316891062763540&scope=bot&permissions=4050113">click here to add wukong! to your server</a>     

</div>

---

> wukong! is now discontinued and won't receive any more updates because of discord's new slash commands being enforced. you can still clone this repository and self-host it by making changes to the command handler, but i won't offer you any support at all.

<h2 align="center">wukong!</h2>

wukong! is a free and open source discord bot built from scratch mainly for learning purposes but also focusing on user experience. uppercase makes wukong uncomfortable.

<h3>table of contents</h3>

- [table of contents](#table-of-contents)
- [to-do](#to-do)
- [commands](#commands)
- [contributing](#contributing)
    - [ideas](#ideas)
    - [coding](#coding)
    - [reporting bugs](#reporting-bugs)
    - [translation](#translation)
- [self-hosting](#self-hosting) 

<h3>to-do</h3>

- [X] user blacklisting
- [ ] music commands
- [ ] welcome message config
- [X] new guild message
- [X] user profiles
- [ ] profile customization

<h2 align="center">commands</h2>

you can find a list of wukong!'s commands at our [docs](https://lucas-philippe-nunes.gitbook.io/wukong/)

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

after that you should be good to go! 😼
