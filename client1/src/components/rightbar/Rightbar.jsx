import "./rightbar.scss"
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

export const Rightbar = () => {

  //fetch story from database
  const { isLoading, error, data } = useQuery(["onlines"], () =>
    makeRequest.get("/onlines").then((res) => {
      return res.data;
    })
  );


  return (
    <div className="rightbar">
      <div className="container">
        <div className="item">

        <span>Suggestion For You</span>
      <div className="user">
        <div className="userInfo">
        <img src="https://images.pexels.com/photos/4881608/pexels-photo-4881608.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" />
        <span>Raju Rastogi</span>
        </div>

        <div className="buttons">
          <button>follow</button>
          <button>dismiss</button>
        </div>
      </div>

      <div className="user">
        <div className="userInfo">
        <img src="https://images.pexels.com/photos/4881606/pexels-photo-4881606.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="pic" />
        <span>Hemang Patel</span>
        </div>
        <div className="buttons">
          <button>follow</button>
          <button>dismiss</button>
        </div>
      </div>
    </div>

      <div className="item">
        <span>Active Friends</span>
        {/* //user list from database */}
        {error
        ? "Something went wrong"
        : isLoading
        ? "loading"
        : data.map((user) => (
            <div className="user" key={user.UserID}>
            <div className="userInfo">
              <img src={"/upload/"+ user.ProfilePhoto} alt="" />
              <div className="online"/>
              <span>{user.Name}</span>
            </div>
            </div>
          ))}
        <div className="user">
        <div className="userInfo">
        <img src="https://images.pexels.com/photos/4881601/pexels-photo-4881601.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="pic" />
        <div className="online" />
        <span>Tushar Ladani</span>               
        </div>
        </div>
        <div className="user">
        <div className="userInfo">
        <img src="https://images.pexels.com/photos/4881602/pexels-photo-4881602.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="pic" />
        <div className="online" />
        <span>Sanjay Khanpara</span>               
        </div>
        </div>
        
        <div className="user">
        <div className="userInfo">
        <img src="https://images.pexels.com/photos/4881603/pexels-photo-4881603.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="pic" />
        <div className="online" />
        <span>Jingesh Gorfad</span>               
        </div>
        </div>
        <div className="user">
        <div className="userInfo">
        <img src="https://images.pexels.com/photos/4881604/pexels-photo-4881604.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="pic" />
        <div className="online" />
        <span>Deep Ladani</span>               
        </div>
        </div>
        <div className="user">
        <div className="userInfo">
        <img src="https://images.pexels.com/photos/4881605/pexels-photo-4881605.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="pic" />
        <div className="online" />
        <span>fyuzan Patel</span>               
        </div>
        </div>
        <div className="user">
        <div className="userInfo">
        <img src="https://images.pexels.com/photos/4881609/pexels-photo-4881609.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="pic" />
        <div className="online" />
        <span>Tarun Gaur</span>               
        </div>
        </div>
        <div className="user">
        <div className="userInfo">
        <img src="https://images.pexels.com/photos/4881612/pexels-photo-4881612.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="pic" />
        <div className="online" />
        <span>Stavan</span>               
        </div>
        </div>

        <div className="user">
        <div className="userInfo">
        <img src="https://images.pexels.com/photos/4881613/pexels-photo-4881613.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="pic" />
        <div className="online" />
        <span>Sahil patel</span>               
        </div>
        </div>
        
      </div>
      </div>
    </div>
  )
}

export default Rightbar