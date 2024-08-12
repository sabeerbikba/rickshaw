"use server";
import "server-only";
import { cookies } from "next/headers";

// this page is edited in android please ignore code structure it will fix later 
export default function Dashbaord() {
const getCookie = cookies();
getCookie.get("token");
getCookie.get("expire");

	
}
