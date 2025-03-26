window.gamepad.TemplateClass = class DualShock4Template {
    /**
     * Instanciates a new DualShock 4 controller template
     */
    constructor() {
        this.gamepad = window.gamepad;
        this.gamepad.updateButton = this.updateButton.bind(this);
        this.gamepad.updateAxis = this.updateAxis.bind(this);
        this.rotateX = 0;
        this.rotateY = 0;
    }

    /**
     * Destroys the template
     */
    destructor() {
        this.gamepad.updateButton = undefined;
        this.gamepad.updateAxis = undefined;
    }

    updateButton($button, button) {
        if (!$button.matches('.trigger') || !button) return;
        $button.style.setProperty('opacity', this.gamepad.useMeterTriggers ? 1 : `${button.value * 100}%`);
        $button.style.setProperty('clip-path', this.gamepad.useMeterTriggers ? `inset(${100 - button.value * 100}% 0px 0px 0pc)` : 'none');
    }

    updateAxis($axis, attribute, axis) {
        if (!$axis.matches('.stick')) return;
        if (attribute === 'data-axis-x') {
            $axis.style.setProperty('margin-left', `${axis * 25}px`);
            this.updateRotate($axis);
        }
        if (attribute === 'data-axis-y') {
            $axis.style.setProperty('margin-top', `${axis * 25}px`);
            this.updateRotate($axis);
        }
    }

    updateRotate($axis) {
        const rotateX = Number.parseFloat($axis.getAttribute('data-value-y') * 30);
        const rotateY = -Number.parseFloat($axis.getAttribute('data-value-x') * 30);
        $axis.style.setProperty('transform', `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
    }
};
