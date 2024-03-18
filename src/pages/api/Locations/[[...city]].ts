import { retrieveDataSpecificNameCity } from "@/lib/RestApi/ScheduleSholat/Service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const { city }: any = req.query;
        const latitude = city[1];
        const longitude = city[2];
        const GetSpesifikCity = await retrieveDataSpecificNameCity(latitude, longitude);

        res.status(200).json({
            status: true,
            statusCode: 200,
            message: "retrieved data user locations successfully",
            CityData: GetSpesifikCity.data.city,
            ProvinceData: GetSpesifikCity.data.province,
            latitude: latitude,
            longitude: longitude
        });
    } catch (error) {
        console.error("Error while fetching data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
