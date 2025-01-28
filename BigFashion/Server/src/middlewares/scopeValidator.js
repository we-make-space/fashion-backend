const scopeValidator = (requiredScopes) => {
	return (req, res, next) => {
		const scopes =
			req.user && req.user.scope ? req.user.scope.split(" ") : [];
		const hasRequiredScopes = requiredScopes.every((scope) =>
			scopes.includes(scope)
		);

		if (!hasRequiredScopes) {
			return res.status(403).send("Forbidden");
		}

		next();
	};
};

export default scopeValidator;
