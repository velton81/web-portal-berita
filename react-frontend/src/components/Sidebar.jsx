import React from "react";

const Sidebar = () => {
    const topikPopuler = [
        "#liga korupsi",
        "#AnakPejabat",
        "#BRILIGA1",
        "#kabar motogp terkini",
        "#UCL",
    ];

    return (
        <aside className="sidebar">
            <div className="topik-populer">
                <h3>TOPIK POPULER</h3>
                {topikPopuler.map((topik, index) => (
                    <a key={index} href={`/search?q=${topik}`} className="tag">
                        {topik}
                    </a>
                ))}
            </div>
        </aside>
    );
};

export default Sidebar;
