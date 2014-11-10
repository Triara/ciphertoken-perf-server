ciphertoken-perf-server
=======================

App designed to be deployed on a standard (known) heroku/aws/etc VM and run performance test on ciphertoken.

For now, these are the supported tests:

- cipher token creation

- access token creation

- access token check firm


### Running tests

Once deployed, tests must be started with

```
content-type:application/json
```

``
POST {public_uri}/start
``
>{
>    "startingTimes": "1000",
>    "iterations": 5
>}

startingTimes is how many elemental operations will be done for each type of performance test.
iterations is the number of times the previous operations will be done, in order to give a more accurate final result. `

After that is done the times of elemental operations will be increased and the same sets will be performed again.

### Retrieving results

```sh
>GET {public_uri}/outCome
```

