sanvar AWS = require('aws-sdk')
var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
var crypto = require('crypto');
AWS.config.update({ region: 'ap-northeast-1' })

var cognitoIdentityProvider = new AWS.CognitoIdentityServiceProvider()
var cognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
var env = process.argv[2]
var table = `celestial-db-${env}`

var clientId = '17dh5d32v6obvii5ieo3k2vra1'
var username = 'r3399r@gmail.com'
var clientSecret = '16opn37laafsp7hdjmmb8an0iq8jmvc9sr6h8no91mrjv484bqp0'
var secretHash = crypto.createHmac('SHA256', clientSecret)
    .update(username + clientId)
    .digest('base64')

var main = async () => {
    const userPools = await cognitoIdentityProvider.listUserPools({ MaxResults: 10 }).promise()
    console.log(userPools)
    // await cognitoIdentityProvider.signUp({
    //     ClientId: clientId,
    //     Username: username,
    //     Password: 'Test1234',
    // }).promise()

    // await cognitoIdentityProvider.confirmSignUp({
    //     ClientId: clientId,
    //     Username: username,
    //     ConfirmationCode: '310319',
    // }).promise()

    const authenticationDetails=new AmazonCognitoIdentity.AuthenticationDetails({
        Username:'r3399r@gmail.com',
        Password:'Test1234',
    })
    const userPool = new AmazonCognitoIdentity.CognitoUserPool({
        UserPoolId:'ap-northeast-1_QTytjUmm4',
        ClientId:clientId,
    })
    const cognitoUser=new AmazonCognitoIdentity.CognitoUser({
        Username:'r3399r@gmail.com',
        Pool:userPool
    })
    cognitoUser.authenticateUser(authenticationDetails,{
        onSuccess:(r)=>{
            console.log(r)
            console.log(r.getIdToken().getJwtToken())
        },
        onFailure:(e)=>console.log(e)
    })
}

main()