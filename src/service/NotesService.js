import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

class NotesService{

    create = async(note)=>{
      await axios({
          method:"Post",
          url:`${API_URL}notes`,
          data:note
      }).catch((e)=>{
          const {message}= e.response.data;
          if(message.errorInfo) throw message.errorInfo[2];
          else throw e.message;
      });
    };

    getAll = async()=>{
        try{
            const response = await axios({
                method:"GET",
                url:`${API_URL}notes`
            });
            return response.data
        }catch(e){
            throw e.message;
        };
    }

    getByCode = async(code)=>{
        try{
            const response = await axios({
                method: "GET",
                url:`${API_URL}notes/${code}`
            });
            return response.data
        }catch(e){
            throw e.message;
        };
        
    }
    update = async(code,note)=>{
        await axios({
            method:"PUT",
            url:`${API_URL}notes/${code}`,
            data:note,
        }).catch((e)=>{
            const{message} = e.response.data;
            if(message.errorInfo) throw message.errorInfo[2];
            else throw e.message;
        });
    };
}

export default new NotesService();