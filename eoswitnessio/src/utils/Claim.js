import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'eosjs';
import ScatterJS from "scatterjs-core";
import ScatterEOS from "scatterjs-plugin-eosjs2";


const Claim = function(event){
    event.preventDefault();
    // Declare the type (EOS)
    ScatterJS.plugins(new ScatterEOS());
    const network = {
        blockchain: "eos",
        protocol: "https",
        host: "nodes.get-scatter.com",
        port: 443,
        chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"
    };
    ScatterJS.scatter.connect("eosiowitness").then(connected => {
        // User does not have Scatter Desktop, Mobile or Classic installed.
        if (!connected) return false;

        const scatter = ScatterJS.scatter;

        // Declare your required fields here.
        const requiredFields = {
            accounts: [network]
        };
        scatter.getIdentity(requiredFields).then(() => {
            const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');

            console.log(account);  // Prints out the account details on the scatter instance, i.e {name: "greenunicorn", authority: "active", publicKey: "EOS5MqPqNJugnbZsHB7pJrFvNuNNrh38KZwNfdtPTgPyEiSCtMBsU", blockchain: "eos"}

            const transactionOptions = { authorization:[`${account.name}@${account.authority}`] };  // Permission Level

            // Save the scatter instance to state or whatever, 
            // Redux
            // dispatch(setScatter(ScatterJS.scatter));


        process(scatter, transactionOptions, network);

        }).catch(error => {
            console.log("Errors here = "+error);
            
        })

        // Null out the scatter reference to prevent other plugins trying to call a valid scatter instance on the user's browser.
        window.ScatterJS = null;
    });

    
   
}

const process = function(scatter, transactionOptions, network){
    console.log("Heading there");
    const rpc = new JsonRpc("http://mainnet.eosnairobi.io", { fetch });
 
    const api = new Api({
        rpc,
        signatureProvider: scatter.eosHook(network)
    });

    const data = {
        claim : "Claim",
        witnesses : ["witness1", "etc"]
    }
    execute(transactionOptions, api, 'claim', data)

}

const execute = function(transactionOptions, api, action_name, data){
    (async () => {
        const result = await api.transact({
          actions: [{
            account: 'eosiowitness',
            name: action_name,
            transactionOptions,
            data: data,
          }]
        }, {
          blocksBehind: 3,
          expireSeconds: 30,
        });
        console.dir(result);
      })();
}

export default Claim;