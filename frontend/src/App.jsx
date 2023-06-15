import { useEffect, useState } from "react";
import { Box, Center, Circle, DarkMode } from "@chakra-ui/react";
import "./App.css";
import axios from "axios";
import Header from "./components/Header";
import Cardcontainer from "./components/Cardcontainer";

function App() {
  const [data, setData] = useState();
  const [isLoaded, setLoaded] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:8080/getall")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (isLoaded) {
    return (
      <>
        <DarkMode>
          <Box className="cont" w="100vw" minHeight="100vh" bgColor={"#161b22"}>
            <Center>
              {" "}
              <Header />
            </Center>
            <Cardcontainer rdata={data} />
          </Box>
        </DarkMode>
      </>
    );
  } else {
    return <></>;
  }
}

export default App;
