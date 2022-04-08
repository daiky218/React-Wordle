import classNames from "classnames";
// export type GuessDistribution = number[];

type DistributionProps = {
    guessDistribution: number[];
};
const Distribution = ({ guessDistribution }: DistributionProps) => {
    const max = Math.max(...guessDistribution);
    const widthPercentage = guessDistribution.map(
        (value) => (value / max) * 90
    );

    return (
        <>
            <div className="distributions-container">
                {guessDistribution.map((value, index) => (
                    <div className="distribution" key={index}>
                        <div className="distribution-key">{index + 1}</div>
                        <div
                            className={classNames("distribution-value", {
                                max: value === max,
                                "no-success": max === 0,
                            })}
                            style={{ width: `${widthPercentage[index] || 5}%` }}
                        >
                            {value}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
export default Distribution;
