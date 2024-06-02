function CatchNotFound(aRequest, aResponse) {
    return aResponse.sendErrorNotFound();
}

export { CatchNotFound };
