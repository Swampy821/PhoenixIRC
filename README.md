PhoenixIRC
==========

A node Bot.
<<< Goto #devcom on freenode to test out the bot for yourself! >>>

##PhoenixIRC Installation
Clone this repository
```
git clone https://github.com/Swampy821/PhoenixIRC.git
```

Install npm modules
```
npm install
```

##Admin

opping
```
<botname>: op <username>
```

deopping
```
<botname>: deop <username>
```

kicking
```
<botname>: kick <username>
```

voice
```
<botname>: voice <username>
```

devoice
```
<botname>: devoice <username>
```

ban
```
<botname>: ban <username>
```

unban
```
<botname>: unban <username>
```

die
```
<botname>: die
```


##Jokes

Tell a joke
```
lets hear a joke
```

##FML

Get FML
```
.fml
```

##Dice
Roll Dice
```
<botname>: roll <# Of Dice>d<# of faces>
```

##Google
Query Google
```
<botname>: google <statement to google>
```

##Fuck Yeah
```
fuck yeah <message>
```

##Bitcoin
```
bitcoin price
```

##Ass
```
<word>-ass <word>
```

Note: this sequence can appear anywhere in a message.

### Configuration Options
You can pass an object to the configuration for the bot with a `frequency` parameter.
This will make the bot respond roughly once every `n` times it hears this sequence.
```json
{
  "plugins": {
    "ass": { "frequency": 10 }
  }
}
```
