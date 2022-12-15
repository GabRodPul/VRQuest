import { useNavigate } from "react-router-dom";

const DEBUG = true;

const IndexPage = () => {
    const navigate = useNavigate();
    return (
        <>
            <h1>VRQuest</h1>
            <div>
                <button onClick={() => navigate(DEBUG ? "/admin-view" : "/login")}>
                    Login
                </button>
            </div>
            <div>
                <button onClick={() => navigate("/signin")}>
                    Sign-in
                </button>
            </div>
            <div>
                <h4>Got any problems?</h4>
                <a>Contact us</a>
            </div>
        </>
    );
};

export default IndexPage;
