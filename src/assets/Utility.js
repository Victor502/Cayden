import 'react-native-get-random-values'
import {v4 as uuidv4} from "uuid";

Utility = {
  DeleteFromServer: async (endpoint, data) => {
    try {
      let res = await fetch(endpoint, {
        method: "DELETE",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      return res.json();
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  },
  PostToServer: async (endpoint, data) => {
    try {
      let res = await fetch(endpoint, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      return res.json();
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  },
  GetFromServer: async (endpoint) => {
    try {
      let res = await fetch(endpoint, {
        methods: "GET",
        credentials: "include",
        header: {
          Accept: "application/json"
        }
      });
      return res.json();
    } catch (e) {
      throw new Error(e);
    }
  },
  GetLocal: async key => {
    try {
      let value = await AsyncStorage.getItem(config.storage.key_prefix + key);
      return value;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  },
  SaveLocal: async (key, value) => {
    try {
      let res = await AsyncStorage.setItem(
        config.storage.key_prefix + key,
        value
      );
      return res;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  },
  GenerateToken: () => {
    console.log('generate token')
    try {
      let uuid = uuidv4()
      console.log('uuid', uuid)
      return uuid
    } catch(e) {
      console.log(e)
    }
  }
};

export default Utility;
