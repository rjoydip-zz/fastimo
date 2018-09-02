const readonly = (target, name, descriptor) => {
    descriptor.writable = false;
    return descriptor;
}

module.exports = Object.assign({}, {
    readonly,
})
