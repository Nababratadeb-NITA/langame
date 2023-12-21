import React from "react";

function Ques({ question, options, onOptionSelect }) {
    return (
        <div class="max-w-2xl mx-auto text-black bg-white p-8 rounded-md">
            <div id="default-carousel" class="relative" data-carousel="static">
                <div class="overflow-hidden relative h-[30rem] rounded-lg">
                    <h1>
                        <span>Q.1 </span>{question}
                    </h1>

                    <div class="text-black h-7">
                        <div class="container mx-auto">
                            <div class="mt-6 space-y-8 xl:mt-12">
                                {options.map((option, i) => {
                                    return (<div class="flex items-center justify-between max-w-2xl px-8 py-4 mx-auto border border-blue-500 cursor-pointer rounded-xl">
                                        

                                        <h2 class="text-base font-semibold text-gray-600 sm:text-xl">
                                            {option}
                                        </h2>
                                    </div>)
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2">
                    <button
                        type="button"
                        class="w-3 h-3 rounded-full"
                        aria-current="false"
                        aria-label="Slide 1"
                        data-carousel-slide-to="0"
                    ></button>
                    <button
                        type="button"
                        class="w-3 h-3 rounded-full"
                        aria-current="false"
                        aria-label="Slide 2"
                        data-carousel-slide-to="1"
                    ></button>
                    <button
                        type="button"
                        class="w-3 h-3 rounded-full"
                        aria-current="false"
                        aria-label="Slide 3"
                        data-carousel-slide-to="2"
                    ></button>
                </div>
                
            </div>

            <button
                class="middle none center w-full rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                data-ripple-light="true"
            >
                Check
            </button>
            <script src="https://unpkg.com/flowbite@1.4.0/dist/flowbite.js"></script>
        </div>
    );
}

export default Ques;
