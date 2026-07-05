const http = require("http");

let temperature = 25;

// Simulate sensor data changing every 2 seconds
setInterval(() => {
    temperature = Math.floor(20 + Math.random() * 20);
    // range: 20°C to 40°C
}, 2000);

const server = http.createServer((req, res) => {

    let status = "NORMAL";
    let color = "#22c55e";

    if (temperature > 35) {
        status = "HIGH TEMPERATURE ALERT!";
        color = "#ef4444";
    } else if (temperature < 25) {
        status = "LOW TEMPERATURE";
        color = "#3b82f6";
    }

    res.writeHead(200, { "Content-Type": "text/html" });

    res.write(`
    <html>
    <head>
        <title>IoT Sensor Dashboard</title>

        <style>
            body {
                font-family: Arial;
                background: #0f172a;
                color: white;
                text-align: center;
            }

            .card {
                margin-top: 80px;
                background: #1e293b;
                width: 350px;
                margin-left: auto;
                margin-right: auto;
                padding: 25px;
                border-radius: 15px;
                box-shadow: 0px 0px 20px #38bdf8;
            }

            .temp {
                font-size: 50px;
                margin: 20px;
                color: #facc15;
            }

            .status {
                font-size: 20px;
                color: ${color};
                font-weight: bold;
            }

            .note {
                margin-top: 15px;
                font-size: 14px;
                color: #94a3b8;
            }
        </style>
    </head>

    <body>

        <h1>🌡️ Smart IoT Sensor Monitoring System</h1>

        <div class="card">

            <h2>Live Temperature Sensor</h2>

            <div class="temp">
                ${temperature} °C
            </div>

            <div class="status">
                ${status}
            </div>

            <div class="note">
                Data updates automatically every 2 seconds (simulated IoT sensor)
            </div>

        </div>

    </body>
    </html>
    `);

    res.end();
});

server.listen(3000, () => {
    console.log("IoT Sensor Dashboard running at http://localhost:3000");
});
