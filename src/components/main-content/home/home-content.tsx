import React, { useState } from "react";
import { DataTableDemo } from "./home-table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { parse, isValid } from "date-fns";

interface MainContentViewProps {}

function MainContentView({}: MainContentViewProps) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [isFromDateValid, setIsFromDateValid] = useState(true);
  const [isToDateValid, setIsToDateValid] = useState(true);

  const validateDate = (dateString: string): boolean => {
    if (dateString.length !== 10) return false;
    const parsedDate = parse(dateString, "dd/MM/yyyy", new Date());
    return isValid(parsedDate);
  };

  const handleFromDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFromDate(value);
    setIsFromDateValid(validateDate(value));
  };

  const handleToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setToDate(value);
    setIsToDateValid(validateDate(value));
  };

  return (
    <div className="flex w-full min-w-max flex-1 flex-col p-4">
      <div className="flex items-center space-x-2">
        <span>Timestamp:</span>
        <Input
          placeholder="From: dd/mm/yyyy"
          className={`w-36 ${!isFromDateValid ? "border-4 border-red-500" : ""}`}
          value={fromDate}
          onChange={handleFromDateChange}
        />
        <Input
          placeholder="To: dd/mm/yyyy"
          className={`w-36 ${!isToDateValid ? "border-4 border-red-500" : ""}`}
          value={toDate}
          onChange={handleToDateChange}
        />
        <Select defaultValue="">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sorting Order</SelectLabel>
              <SelectItem value="null">Empty</SelectItem>
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select defaultValue="">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sorting Order Priority</SelectLabel>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-2 flex items-center space-x-2">
        <span>Domain:</span>
        <Input placeholder="Domain query string" className="w-64 min-w-[200px]" />
        <Select defaultValue="">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sorting Order</SelectLabel>
              <SelectItem value="null">Empty</SelectItem>
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select defaultValue="">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sorting Order Priority</SelectLabel>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-2 flex items-center space-x-2">
        <span>Path:</span>
        <Input placeholder="Path query string" className="w-64 min-w-[200px]" />
        <Select defaultValue="">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sorting Order</SelectLabel>
              <SelectItem value="null">Empty</SelectItem>
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select defaultValue="">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sorting Order Priority</SelectLabel>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-5 flex space-x-2">
        <Button variant="outline">Clear</Button>
        <Button variant="outline">Save</Button>
        <Button>Search</Button>
      </div>
    </div>
  );
}

export default MainContentView;

/* 
<div className="flex">
  <div className="inline-flex flex-nowrap">
    <DataTableDemo />
    <DataTableDemo />
    <DataTableDemo />
    <DataTableDemo />
  </div>
</div> */
/* <DataTableDemo /> */
