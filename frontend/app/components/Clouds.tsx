export default function Clouds({
    className = '',
    style,
    colors = ['#AFCFFF', '#C4DEFF', '#DCEBFF'] as [string, string, string],
}: {
    className?: string;
    style?: React.CSSProperties;
    colors?: [string, string, string];
}) {
    return (
        <svg
            className={className}
            style={style}
            viewBox="0 0 1440 400"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M0,400 L0,240
                   A45,45 0 0 1 90,210
                   A75,75 0 0 1 250,160
                   A50,50 0 0 1 340,200
                   A85,85 0 0 1 520,170
                   A55,55 0 0 1 630,215
                   A70,70 0 0 1 780,180
                   A50,50 0 0 1 880,220
                   A65,65 0 0 1 1010,190
                   A60,60 0 0 1 1140,225
                   A45,45 0 0 1 1230,210
                   A70,70 0 0 1 1440,235
                   L1440,400 Z"
                fill={colors[0]}
            />
            <path
                d="M0,400 L0,290
                   A40,40 0 0 1 80,265
                   A60,60 0 0 1 200,235
                   A45,45 0 0 1 290,265
                   A65,65 0 0 1 430,240
                   A50,50 0 0 1 540,270
                   A55,55 0 0 1 660,250
                   A40,40 0 0 1 750,275
                   A60,60 0 0 1 880,245
                   A48,48 0 0 1 990,275
                   A55,55 0 0 1 1110,255
                   A42,42 0 0 1 1200,278
                   A50,50 0 0 1 1440,290
                   L1440,400 Z"
                fill={colors[1]}
            />
            <path
                d="M0,400 L0,335
                   A35,35 0 0 1 70,315
                   A50,50 0 0 1 170,295
                   A38,38 0 0 1 250,318
                   A55,55 0 0 1 370,300
                   A42,42 0 0 1 460,320
                   A48,48 0 0 1 570,305
                   A35,35 0 0 1 650,322
                   A52,52 0 0 1 770,302
                   A40,40 0 0 1 870,322
                   A48,48 0 0 1 980,308
                   A38,38 0 0 1 1070,325
                   A45,45 0 0 1 1440,332
                   L1440,400 Z"
                fill={colors[2]}
            />
        </svg>
    );
}
