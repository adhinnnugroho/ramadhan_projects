import SholatServices from "@/Services/Sholat";
import BackNavigations from "@/UI/Navigations/BackNavigations";
import MobileNavigations from "@/UI/Navigations/MobileNavigations";
import { useEffect, useState } from "react";

const UserLocations = () => {
    const [location, setLocation] = useState<any>(null);
    const [JadwalMonthly, setJadwalMonthly] = useState<any>(null);
    const [JadwalDaily, setJadwalDaily] = useState<any>(null);
    const [UserLocation, setUserLocation] = useState<any>(null);
    const [CityId, setCityId] = useState<any>(null);

    const GetUserLocations = async (latitude: number, longitude: number) => {
        const data = await SholatServices.getUserLocations(latitude, longitude);
        setUserLocation(data.data.locationData.city);
    }

    const GetCityId = async (city: string) => {
        const data = await SholatServices.getCityId(city);
        setCityId(data.data.data[0].id);
    }

    const GetScheduleSholatMonthly = async (cityId: number, year: number, month: number) => {
        const data = await SholatServices.GetScheduleSholatMonthly(cityId, year, month);
        setJadwalMonthly(data.data.data.jadwal);
    }

    const GetScheduleSholatDaily = async (cityId: number, year: number, month: number, date: number) => {
        const data = await SholatServices.GetScheduleSholatDaily(cityId, year, month, date);
        setJadwalDaily(data.data);
        console.log(data.data);
    }

    useEffect(() => {
        const getLocation = () => {
            const options = {
                enableHighAccuracy: true,
            };

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                    GetUserLocations(latitude, longitude);
                },
                (error) => {
                    console.error(error.message);
                },
                options
            );

        };
        getLocation();
    }, []);

    useEffect(() => {
        if (UserLocation) {
            GetCityId(UserLocation.name);
        }
    });


    useEffect(() => {
        if (CityId) {
            const currentDate: Date = new Date();
            const year: number = currentDate.getFullYear();
            const month: number = currentDate.getMonth() + 1;
            const DateNow: number = currentDate.getDate();
            GetScheduleSholatMonthly(CityId, year, month);
            GetScheduleSholatDaily(CityId, year, month, DateNow);
        }
    }, [CityId]);

    console.log(JadwalDaily);
    return (
        <div>
            <BackNavigations SurahName='' link={'/Home'} />
            {/* <div className="grid grid-cols-10 gap-5 ml-2 mr-2 mt-10 pb-16">
                {jadwal && jadwal.map((jadwal: any, index: number) => {
                    return (
                        <div key={index}>
                            <div className="col-span-1 border-b pb-1 border-b-gray-500">
                                <h5 className="text-center font-semibold">
                                    {jadwal.tanggal}
                                </h5>
                            </div>  
                        </div>
                    )
                })}
            </div> */}
            <MobileNavigations />
        </div>
    );
}

export default UserLocations;


