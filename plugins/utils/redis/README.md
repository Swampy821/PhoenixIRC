# API 


## Set

```
    redisPlugin.set('key', 'value', ttl(int in ms)).then(response => {
        console.log("Watever success response I get");
    });
```

## Get

```
    redisPlugin.get('key').then(data => {
        console.log(data);
    }).
    catch(err => {
        console.log('error!!!!');
    });
```