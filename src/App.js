import React, { useState } from "react";
import styled from "styled-components";
import bg from "./assets/sunset.jpg";

function App() {
    const [data, setData] = useState({});
    const [location, setLocation] = useState("");
    const [placeholder, setPlaceholder] = useState(
        "Type here a city and press the Enter"
    );

    async function apiHandler(e) {
        if (e.key === "Enter") {
            try {
                setPlaceholder("Type here a city and press the Enter");
                const response = await fetch(
                    `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=2832c0956a45255c86e88019a5807954`
                );
                const data = await response.json();
                setData(data);
                setLocation("");
                if (!response.ok) {
                    setPlaceholder("Sorry, something went wrong");
                    console.log(response.statusText + " " + response.url);
                }
            } catch (e) {}
        }
    }

    return (
        <div className="App">
            <Wrapper>
                <Input
                    value={location}
                    onKeyDown={apiHandler}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={placeholder}
                />

                <TempBlock>
                    <Temp>
                        {data.main ? (data.main.temp - 273).toFixed(1) : null}°C
                    </Temp>
                    <p>{data ? data.name : null}</p>
                </TempBlock>

                <Info>
                    <div className="feels">
                        <InfoBlock>
                            {data.main
                                ? (data.main.feels_like - 273).toFixed(1)
                                : null}{" "}
                            °C
                        </InfoBlock>
                        <p>Feels Like</p>
                    </div>
                    <div className="humidity">
                        <InfoBlock>
                            {data.main ? data.main.humidity : null} %
                        </InfoBlock>
                        <p>Humidity</p>
                    </div>
                    <div className="winds">
                        <InfoBlock>
                            {data.main ? data.wind.speed : null} m/s
                        </InfoBlock>
                        <p>Winds</p>
                    </div>
                </Info>
            </Wrapper>
        </div>
    );
}

const TempBlock = styled.div`
    font-size: 50px;
    margin-bottom: 30px;
    @media (max-width: 460px) {
        margin-bottom: 20px;
        font-size: 40px;
    }
    @media (max-width: 380px) {
        font-size: 25px;
    }
    @media (max-height: 330px) {
        margin-bottom: 10px;
    }
`;

const InfoBlock = styled.p`
    display: block;
    font-weight: 700;
    font-size: 20px;
`;

const Info = styled.div`
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 20px;
    border-radius: 12px;
    background-color: rgba(255, 255, 255, 0.3);
    max-width: 700px;
    width: 100%;
    @media (max-width: 650px) {
        flex-direction: column;
        gap: 30px;
        max-width: 300px;
    }
`;

const Temp = styled.p`
    font-weight: 800;
`;

const Input = styled.input`
    max-width: 600px;
    width: 100%;
    height: 50px;
    border-radius: 30px;
    border: 1px solid #fff;
    padding: 0 15px;
    font-size: 25px;
    margin-bottom: 50px;
    text-align: center;
    &::placeholder {
        color: #fff;
    }
    @media (max-width: 650px) {
        font-size: 17px;
        margin-bottom: 30px;
    }
    @media (max-width: 460px) {
        font-size: 12px;
        height: 40px;
        margin-bottom: 20px;
    }
    @media (max-height: 330px) {
        margin-bottom: 10px;
    }
`;

const Wrapper = styled.div`
    position: relative;
    color: #fff;
    text-align: center;
    padding: 0px 15px;
    background-color: rgba(0, 0, 0, 0.4);
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-image: url(${bg});
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        margin-right: 0px;
        z-index: -1;
    }
`;

export default App;
