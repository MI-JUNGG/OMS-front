import { createSlice } from "@reduxjs/toolkit";

const cardSlice = createSlice({
    name: "counter",
    initialState: {
        day: [
            {
                cardId: 3,
                title: "데이",
                repeat: 2,
                startDate: "2023-07-03 10:00",
                endDate: "2023-07-03 11:00",
                deadline: null,
                color: "#F7F1FF",
                memo: "epdl",
                link: "epdl",
            },
        ],
        week: [
            {
                cardId: 3,
                title: "나와라",
                repeat: 2,
                startDate: "2023-07-03 10:00",
                endDate: "2023-07-03 11:00",
                deadline: null,
                color: "#F7F1FF",
                memo: "나아ㅘ",
                link: "네이버",
            },
            {
                cardId: 4,
                title: "4",
                repeat: 2,
                startDate: "2023-07-03 09:00",
                endDate: "2023-07-03 11:00",
                deadline: null,
                color: "#F7F1FF",
                memo: "4",
                link: "4",
            },
        ],
        month: [],
    },

    reducers: {
        addCard: (state, action) => {
            const { cardType, cardData } = action.payload;
            console.log(action.payload);
            if (cardType === "day") {
                state.day.push(...cardData);
            }
            if (cardType === "week") {
                state.week.push(...cardData);
            }
            if (cardType === "month") {
                cardData.forEach((card) => {
                    const existingCard = state.month.find(
                        (c) => c.cardId === card.cardId,
                    );
                    if (!existingCard) {
                        state.month.push(card);
                    }
                });
            }
        },
    },
});

export const { addCard, removeCard } = cardSlice.actions;

export default cardSlice.reducer;
