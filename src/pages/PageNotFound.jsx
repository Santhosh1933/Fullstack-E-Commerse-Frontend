import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

export const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="pt-[13vh]"></div>

      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button onClick={()=>navigate('/')} type="primary">Back Home</Button>}
      />
    </div>
  );
};
