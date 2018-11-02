import ScatterJS from "scatterjs-core";
import ScatterEOS from "scatterjs-plugin-eosjs2";

const Login = function (event) {
    event.preventDefault();
    // Declare your network. For local, substitute with the appropriate values below. Dont forget the chain ID!
    const network = {
        blockchain: "eos",
        protocol: "https",
        host: "nodes.get-scatter.com",
        port: 443,
        chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"
    };

    // Declare the type (EOS)
    ScatterJS.plugins(new ScatterEOS());

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

            // Save the scatter instance to state or whatever, 
            // Redux
            // dispatch(setScatter(ScatterJS.scatter));




        }).catch(error => {
            console.log("Errors here = "+error);
            
        })

        // Null out the scatter reference to prevent other plugins trying to call a valid scatter instance on the user's browser.
        window.ScatterJS = null;
    });
}

export default Login;