//
class Dataset {
	constructor() {
		this.labels = []
	}


	//add Example function to add an image and label to my dataset
	addExample(example, label) {
		if (this.xs == null) {
			this.xs = tf.keep(example);
			this.labels.push(label);
		} else {
			const oldX = this.xs;
			this.xs = tf.keep(oldX.concat(example, 0));
			this.labels.push(label);
			oldX.dispose();
		}
	}

	//function to transform image label in one hot encoder
	encodeLabels(numClasses) {
		for (var i=0; i < this.labels.length; i++) {
			if (this.ys == null) {
				this.ys = tf.keep(tf.tidy(
				() => {return tf.oneHot(
				tf.tensor1d([this.labels[i]]).toInt(), numClasses)}));
			} else {
				const oldY = this.ys;
				const y = tf.tidy(
				() => {return tf.oneHot(
				tf.tensor1d([this.labels[i]]).toInt(), numClasses)});
				
				this.ys = tf.keep(oldY.concat(y, 0));
				oldY.dispose();
				y.dispose();
			}
		}
	}
}
