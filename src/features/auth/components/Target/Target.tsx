import styles from "./Target.module.scss";
import { useAuthentication } from "../../hooks/useAuthentication";
import cx from "classnames";
import type { ComponentType } from "react";
import { type LucideProps, Check } from "lucide-react";
import type { InitialTarget } from "../../contexts/types";

interface GoalProps {
    target: {
        id: InitialTarget;
        icon: ComponentType<LucideProps>;
        title: string;
        description: string;
    };
}

export const Target = ({ target }: GoalProps) => {
    const Icon = target.icon;
    const { handleTargetSelect, formData } = useAuthentication();

    return (
        <button
            key={target.id}
            type="button"
            onClick={() => handleTargetSelect(target.id)}
            className={cx(
                styles.target,
                formData.initialTarget === target.id && styles.selected,
            )}
        >
            <div
                className={cx(
                    styles.targetIcon,
                    formData.initialTarget === target.id && styles.selected,
                )}
            >
                <Icon strokeWidth={1.5} />
            </div>

            <div className={styles.targetInfo}>
                <span className={styles.targetTitle}>{target.title}</span>
                <span className={styles.targetDescription}>
                    {target.description}
                </span>
            </div>
            <div
                className={cx(styles.targetCheck, formData.initialTarget === target.id && styles.selected)}
            >
                {formData.initialTarget === target.id && (
                    <Check color="var(--white-100)" size={10} strokeWidth={3} />
                )}
            </div>
        </button>
    );
};
