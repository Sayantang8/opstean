import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface BirthDatePickerProps {
    date?: Date;
    onDateChange: (date: Date | undefined) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
}

export function BirthDatePicker({
    date,
    onDateChange,
    placeholder = "Select your date of birth",
    disabled = false,
    className,
}: BirthDatePickerProps) {
    const [day, setDay] = React.useState<string>(date ? date.getDate().toString() : "");
    const [month, setMonth] = React.useState<string>(date ? date.getMonth().toString() : "");
    const [year, setYear] = React.useState<string>(date ? date.getFullYear().toString() : "");

    // Generate years from 1920 to current year
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1919 }, (_, i) => currentYear - i);

    // Generate months
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Generate days based on selected month and year
    const getDaysInMonth = (monthIndex: number, year: number) => {
        return new Date(year, monthIndex + 1, 0).getDate();
    };

    const days = React.useMemo(() => {
        if (!month || !year) return Array.from({ length: 31 }, (_, i) => i + 1);
        const daysInMonth = getDaysInMonth(parseInt(month), parseInt(year));
        return Array.from({ length: daysInMonth }, (_, i) => i + 1);
    }, [month, year]);

    // Update date when day, month, or year changes
    React.useEffect(() => {
        if (day && month && year) {
            const newDate = new Date(parseInt(year), parseInt(month), parseInt(day));
            onDateChange(newDate);
        } else {
            onDateChange(undefined);
        }
    }, [day, month, year, onDateChange]);

    // Update local state when date prop changes
    React.useEffect(() => {
        if (date) {
            setDay(date.getDate().toString());
            setMonth(date.getMonth().toString());
            setYear(date.getFullYear().toString());
        } else {
            setDay("");
            setMonth("");
            setYear("");
        }
    }, [date]);

    const isValidDate = day && month && year;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !isValidDate && "text-muted-foreground",
                        className
                    )}
                    disabled={disabled}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {isValidDate && date ? format(date, "PPP") : <span>{placeholder}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4" align="start">
                <div className="space-y-4">
                    <div className="text-sm font-medium">Select your date of birth</div>
                    <div className="grid grid-cols-3 gap-2">
                        <div>
                            <label className="text-xs text-muted-foreground mb-1 block">Day</label>
                            <Select value={day} onValueChange={setDay} disabled={disabled}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Day" />
                                </SelectTrigger>
                                <SelectContent className="max-h-[200px]">
                                    {days.map((dayNum) => (
                                        <SelectItem key={dayNum} value={dayNum.toString()}>
                                            {dayNum}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="text-xs text-muted-foreground mb-1 block">Month</label>
                            <Select value={month} onValueChange={setMonth} disabled={disabled}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Month" />
                                </SelectTrigger>
                                <SelectContent>
                                    {months.map((monthName, index) => (
                                        <SelectItem key={index} value={index.toString()}>
                                            {monthName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="text-xs text-muted-foreground mb-1 block">Year</label>
                            <Select value={year} onValueChange={setYear} disabled={disabled}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Year" />
                                </SelectTrigger>
                                <SelectContent className="max-h-[200px]">
                                    {years.map((yearNum) => (
                                        <SelectItem key={yearNum} value={yearNum.toString()}>
                                            {yearNum}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    {isValidDate && date && (
                        <div className="text-sm text-center p-2 bg-muted rounded">
                            Selected: {format(date, "EEEE, MMMM d, yyyy")}
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}