window.__ModuleLoader__.load({
	id: "dsh-generative-ideas",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		let react = require("react");
		let react_dom_client = require("react-dom/client");
		let react_jsx_runtime = require("react/jsx-runtime");
		//#region lib/locale.js
		const NS = "rich-ideas";
		const en = {
			"entry.label": "Ideas",
			"entry.tooltip": "Generate and compare roadmaps — pick one, export it as goal.md",
			"panel.title": "Roadmap ideation",
			"step.focus": "Context",
			"step.generating": "Generating",
			"step.compare": "Compare",
			"step.chosen": "Chosen",
			"focus.label": "What are we planning?",
			"focus.placeholder": "e.g. 'Ship v2 of the product with a focus on reliability and developer experience'",
			"focus.constraints": "Constraints (optional)",
			"focus.constraintsPlaceholder": "e.g. 'no new infrastructure, 2-week deadline'",
			"focus.horizon": "Horizon",
			"focus.workspace": "Target workspace",
			"focus.workspacePlaceholder": "Select a workspace…",
			"action.generate": "Generate roadmaps",
			"action.generating": "Generating… (30-90s)",
			"action.export": "Export goal.md",
			"action.exported": "goal.md exported",
			"action.close": "Close",
			"action.newRound": "New round",
			"option.thesis": "thesis",
			"option.phases": "phases",
			"option.risks": "risks",
			"option.effort": "effort",
			"option.choose": "Choose this",
			"option.chosen": "Chosen",
			"error.generic": "failed"
		};
		const zh = {
			"entry.label": "构想",
			"entry.tooltip": "生成并对比路线图——选出最合适的，导出为 goal.md",
			"panel.title": "路线图构想",
			"step.focus": "上下文",
			"step.generating": "生成中",
			"step.compare": "对比",
			"step.chosen": "已选定",
			"focus.label": "我们在规划什么？",
			"focus.placeholder": "例如：'发布产品 v2，重点关注可靠性与开发者体验'",
			"focus.constraints": "约束（可选）",
			"focus.constraintsPlaceholder": "例如：'不加新基础设施，两周截止'",
			"focus.horizon": "时间跨度",
			"focus.workspace": "目标工作区",
			"focus.workspacePlaceholder": "选择工作区…",
			"action.generate": "生成路线图",
			"action.generating": "生成中…（30-90 秒）",
			"action.export": "导出 goal.md",
			"action.exported": "goal.md 已导出",
			"action.close": "关闭",
			"action.newRound": "再来一轮",
			"option.thesis": "核心押注",
			"option.phases": "阶段",
			"option.risks": "风险",
			"option.effort": "工作量",
			"option.choose": "选这个",
			"option.chosen": "已选定",
			"error.generic": "失败"
		};
		let dict = { en, zh };
		const lang = (typeof navigator !== "undefined" && /^(zh)/i.test(navigator.language ?? "")) ? "zh" : "en";
		const t = (key) => dict[lang][key] ?? dict.en[key] ?? key;
		//#endregion
		//#region lib/styles.js
		const css = `.rgi-entry{appearance:none;display:flex;align-items:center;gap:8px;width:100%;height:36px;padding:0 10px;font:inherit;font-size:13px;line-height:20px;color:var(--dsw-alias-label-secondary);background:0 0;border:none;border-radius:8px;cursor:pointer;text-align:left}
.rgi-entry:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}
.rgi-entry[data-generating="true"] .rgi-entryIcon{color:var(--dsw-alias-state-business-primary);animation:rgi-entry-pulse 1.5s ease-in-out infinite}
@keyframes rgi-entry-pulse{0%,100%{opacity:1}50%{opacity:.4}}
.rgi-entry[data-active="true"]{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}
.rgi-entryIcon{justify-content:center;align-items:center;width:24px;height:24px;display:inline-flex;flex:none;color:var(--dsw-alias-label-tertiary)}
.rgi-entryLabel{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.rgi-scrim{position:fixed;inset:0;z-index:90;background:color-mix(in srgb, var(--dsw-alias-bg-mask-2, rgba(0,0,0,.45)) 100%, transparent);display:flex;align-items:center;justify-content:center;padding:24px}
.rgi-card{width:100%;max-width:720px;max-height:min(85vh,680px);border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-specific-tip);border-radius:12px;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 8px 24px var(--dsw-alias-bg-mask-2, rgba(0,0,0,.35))}
.rgi-card,.rgi-card *{box-sizing:border-box}
.rgi-head{display:flex;align-items:baseline;gap:8px;padding:14px 16px 10px;border-bottom:1px solid var(--dsw-alias-border-l1)}
.rgi-title{font-size:14px;font-weight:500;line-height:20px;color:var(--dsw-alias-label-primary);flex:1}
.rgi-close{flex:none;width:28px;height:28px;display:grid;place-items:center;color:var(--dsw-alias-label-tertiary);cursor:pointer;background:0 0;border:none;border-radius:999px;font-size:16px}
.rgi-close:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}
.rgi-stepper{display:flex;border-bottom:1px solid var(--dsw-alias-border-l1)}
.rgi-step{flex:1;text-align:center;padding:7px 0;font-size:12px;line-height:16px;color:var(--dsw-alias-label-caption);border-bottom:2px solid transparent}
.rgi-stepOn{color:var(--dsw-alias-state-business-primary);border-bottom-color:var(--dsw-alias-state-business-primary);font-weight:500}
.rgi-stepDone{color:var(--dsw-alias-state-success-primary)}
.rgi-body{flex:1;min-height:0;overflow-y:auto;padding:16px;scrollbar-width:none}
.rgi-body::-webkit-scrollbar{display:none}
.rgi-field{display:flex;flex-direction:column;gap:4px;margin-bottom:14px}
.rgi-label{color:var(--dsw-alias-label-secondary);font-size:12px;line-height:16px;font-weight:500}
.rgi-input,.rgi-textarea,.rgi-select{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);border-radius:8px;font:inherit;font-size:13px;line-height:20px;padding:6px 10px;outline:none}
.rgi-input:focus,.rgi-textarea:focus,.rgi-select:focus{border-color:var(--dsw-alias-state-business-primary)}
.rgi-textarea{resize:vertical;min-height:56px}
.rgi-row{display:flex;gap:10px}
.rgi-row>*{flex:1}
.rgi-generate{width:100%;padding:10px;background:var(--dsw-alias-state-business-primary);color:#fff;border:none;border-radius:8px;font:inherit;font-size:14px;font-weight:500;cursor:pointer}
.rgi-generate:hover:not(:disabled){opacity:.9}
.rgi-generate:disabled{opacity:.5;cursor:default}
.rgi-genState{display:flex;flex-direction:column;align-items:center;gap:12px;padding:40px 0}
.rgi-genSpinner{width:28px;height:28px;border-radius:50%;border:3px solid var(--dsw-alias-interactive-bg-hover);border-top-color:var(--dsw-alias-state-business-primary);animation:rgi-spin 1s linear infinite}
@keyframes rgi-spin{to{transform:rotate(360deg)}}
.rgi-genText{color:var(--dsw-alias-label-secondary);font-size:14px;line-height:20px}
.rgi-genSub{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:16px}
.rgi-options{display:flex;flex-direction:column;gap:0}
.rgi-option{border:1px solid var(--dsw-alias-border-l1);border-radius:0;margin:0;padding:0;cursor:pointer;background:var(--dsw-alias-bg-base)}
.rgi-option+.rgi-option{border-top:none}
.rgi-option:first-child{border-radius:8px 8px 0 0}
.rgi-option:last-child{border-radius:0 0 8px 8px}
.rgi-option:hover{background:var(--dsw-alias-interactive-bg-hover)}
.rgi-optionOn{border-color:var(--dsw-alias-state-business-primary);background:color-mix(in srgb, var(--dsw-alias-state-business-primary) 5%, var(--dsw-alias-bg-base))}
.rgi-optionHead{display:flex;align-items:baseline;gap:8px;padding:12px 14px 6px}
.rgi-optionName{font-size:15px;font-weight:600;line-height:20px;color:var(--dsw-alias-label-primary);flex:1}
.rgi-optionEffort{font-size:11px;line-height:16px;color:var(--dsw-alias-label-tertiary);background:var(--dsw-alias-interactive-bg-hover);border-radius:999px;padding:1px 8px;flex:none}
.rgi-optionThesis{padding:0 14px 8px;color:var(--dsw-alias-label-secondary);font-size:13px;line-height:18px}
.rgi-optionPhases{padding:0 14px 8px;display:flex;flex-wrap:wrap;gap:4px}
.rgi-phaseChip{font-size:11px;line-height:16px;color:var(--dsw-alias-label-tertiary);background:var(--dsw-alias-interactive-bg-hover);border-radius:4px;padding:1px 6px}
.rgi-optionRisks{padding:0 14px 10px;color:var(--dsw-alias-label-caption);font-size:12px;line-height:16px}
.rgi-optionFooter{display:flex;justify-content:flex-end;padding:0 14px 10px}
.rgi-chooseBtn{background:0 0;border:1px solid var(--dsw-alias-border-l2);border-radius:6px;padding:4px 12px;font:inherit;font-size:12px;line-height:16px;color:var(--dsw-alias-label-secondary);cursor:pointer}
.rgi-chooseBtn:hover{border-color:var(--dsw-alias-state-business-primary);color:var(--dsw-alias-state-business-primary)}
.rgi-chooseBtnOn{border-color:var(--dsw-alias-state-business-primary);color:var(--dsw-alias-state-business-primary);font-weight:500}
.rgi-footer{display:flex;align-items:stretch;border-top:1px solid var(--dsw-alias-border-l1)}
.rgi-status{flex:1;align-self:center;min-width:0;padding:0 12px;color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:16px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.rgi-statusErr{color:var(--dsw-alias-state-error-primary)}
.rgi-statusOk{color:var(--dsw-alias-state-success-primary)}
.rgi-actionBtn{appearance:none;background:0 0;border:none;border-left:1px solid var(--dsw-alias-border-l1);padding:9px 18px;font:inherit;font-size:13px;line-height:20px;color:var(--dsw-alias-label-secondary);cursor:pointer}
.rgi-actionBtn:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}
.rgi-actionBtn:disabled{opacity:.45;cursor:default}
.rgi-actionPrimary{color:var(--dsw-alias-state-business-primary);font-weight:500}`;
		const tagId = "dsh-generative-ideas/panel.css";
		if (typeof document !== "undefined" && document.querySelector(`style[data-plugin-css="${tagId}"]`) === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-generative-ideas";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		//#endregion
		//#region lib/sidebar.js
		const ENTRY_ATTR = "data-dsh-generative-ideas-entry";
		const FAMILY = ["[data-dsh-taskboard-entry]", "[data-dsh-ssh-entry]", "[data-dsh-skill-explorer-entry]", "[data-dsh-rich-context-entry]", `[${ENTRY_ATTR}]`];
		const ICON = "<svg viewBox=\"0 0 16 16\" width=\"18\" height=\"18\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.3\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M8 1.5a3 3 0 0 1 3 3c0 .8-.3 1.5-.8 2-.5.6-.7 1.2-.7 2v.5h-3v-.5c0-.8-.2-1.4-.7-2-.5-.5-.8-1.2-.8-2a3 3 0 0 1 3-3z\"/><path d=\"M6.5 11.5h3M7 13.5h2\"/></svg>";

		function sidebarRoot() {
			const column = document.querySelector("[data-pane=\"sidebar\"], [class*=\"sidebarCol\"]");
			if (column === null) return undefined;
			return column.querySelector("[class*=\"logoRow\"]")?.parentElement ?? column.firstElementChild ?? undefined;
		}
		function newSessionButton(root) {
			const nested = root.querySelector("button[class*=\"newSession\"]");
			if (nested !== null) return nested;
			for (const child of root.children) if (child.tagName === "BUTTON") return child;
			return undefined;
		}
		function mountSidebarEntry(onToggle, isActive, subscribe) {
			if (document.querySelector(`[${ENTRY_ATTR}]`) !== null) return () => {};
			const entry = document.createElement("button");
			entry.type = "button";
			entry.setAttribute(ENTRY_ATTR, "");
			entry.setAttribute("data-dsh-plugin", "generative-ideas");
			entry.setAttribute("data-dsh-part", "sidebar-entry");
			entry.className = "rgi-entry";
			entry.setAttribute("aria-label", t("entry.tooltip"));
			entry.setAttribute("title", t("entry.tooltip"));
			entry.innerHTML = `<span class="rgi-entryIcon">${ICON}</span><span class="rgi-entryLabel">${t("entry.label")}</span>`;
			entry.addEventListener("click", onToggle);
			let root;
			let placed = false;
			const place = () => {
				const button = root === undefined ? undefined : newSessionButton(root);
				if (button === undefined) return false;
				if (entry.parentElement !== root) {
					const row = button.closest("[class*=\"logoRow\"]");
					const base = row !== null && row.parentElement === root ? row : button;
					const family = Array.from(root.children).filter((el) => el instanceof HTMLElement && el.matches(FAMILY.join(", ")));
					const anchor = family.length > 0 ? family[family.length - 1].nextElementSibling : base.nextElementSibling;
					root.insertBefore(entry, anchor);
				}
				return true;
			};
			const tryPlace = () => {
				if (root !== undefined && !root.isConnected) { rootObserver.disconnect(); root = undefined; placed = false; }
				if (placed && document.body.contains(entry)) return;
				if (placed && !document.body.contains(entry)) { rootObserver.disconnect(); root = undefined; placed = false; }
				root ??= sidebarRoot();
				if (root === undefined) return;
				placed = place();
				if (placed) rootObserver.observe(root, { childList: true, subtree: true });
			};
			const waitObserver = new MutationObserver(tryPlace);
			waitObserver.observe(document.body, { childList: true, subtree: true });
			const rootObserver = new MutationObserver(() => {
				if (root === undefined || !root.isConnected) { placed = false; tryPlace(); return; }
				if (!root.contains(entry)) placed = place();
			});
			let unsubscribe;
			if (subscribe !== undefined) {
				const sync = () => { if (isActive()) entry.dataset.active = "true"; else delete entry.dataset.active; };
				unsubscribe = subscribe(sync);
				sync();
			}
			tryPlace();
			return () => {
				waitObserver.disconnect();
				rootObserver.disconnect();
				unsubscribe?.();
				entry.remove();
			};
		}
		//#endregion
		//#region lib/api.js
		const API = "/api/rich-ideas";
		async function api(path, init) {
			const res = await fetch(`${API}${path}`, init);
			const body = await res.json().catch(() => ({ ok: false, error: "bad-host-response" }));
			if (!res.ok || body.ok !== true) throw new Error(body.error ?? `HTTP ${res.status}`);
			return body;
		}
		async function fetchState() { return api("/state", { cache: "no-store" }) }
		async function generate(body) {
			return api("/generate", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) })
		}
		async function pollState() {
			return api("/state", { cache: "no-store" })
		}
		async function exportGoal(body) {
			return api("/export", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) })
		}
		//#endregion
		//#region lib/panel.js
		const STEPS = ["focus", "generating", "compare", "chosen"];
		function Stepper({ step }) {
			return (0, react_jsx_runtime.jsx)("div", {
				className: "rgi-stepper",
				children: STEPS.map((name, index) => {
					const active = STEPS.indexOf(step);
					return (0, react_jsx_runtime.jsx)("span", {
						className: index === active ? "rgi-step rgi-stepOn" : index < active ? "rgi-step rgi-stepDone" : "rgi-step",
						children: t(`step.${name}`)
					}, name)
				})
			});
		}

		function OptionCard({ option, chosen, onChoose }) {
			const phases = option.phases ?? [];
			const risks = (option.risks ?? []).map((r) => typeof r === "string" ? r : r.description ?? String(r)).join(" · ");
			return (0, react_jsx_runtime.jsxs)("div", {
				className: chosen ? "rgi-option rgi-optionOn" : "rgi-option",
				onClick: () => onChoose(option),
				children: [
					(0, react_jsx_runtime.jsxs)("div", {
						className: "rgi-optionHead",
						children: [
							(0, react_jsx_runtime.jsx)("span", { className: "rgi-optionName", children: option.name }),
							(0, react_jsx_runtime.jsx)("span", { className: "rgi-optionEffort", children: `${t("option.effort")}: ${option.effort ?? "M"}` })
						]
					}),
					(0, react_jsx_runtime.jsx)("div", { className: "rgi-optionThesis", children: option.thesis }),
					phases.length > 0 ? (0, react_jsx_runtime.jsx)("div", {
						className: "rgi-optionPhases",
						children: phases.map((phase, i) => (0, react_jsx_runtime.jsx)("span", { className: "rgi-phaseChip", children: `${i + 1}. ${phase.name}` }, i))
					}) : null,
					risks !== "" ? (0, react_jsx_runtime.jsx)("div", { className: "rgi-optionRisks", children: `${t("option.risks")}: ${risks}` }) : null,
					(0, react_jsx_runtime.jsx)("div", {
						className: "rgi-optionFooter",
						children: (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							className: chosen ? "rgi-chooseBtn rgi-chooseBtnOn" : "rgi-chooseBtn",
							onClick: (event) => { event.stopPropagation(); onChoose(option); },
							children: chosen ? `\u2713 ${t("option.chosen")}` : t("option.choose")
						})
					})
				]
			});
		}

		function IdeasPanel({ onClose, onGeneratingChange }) {
			const [step, setStep] = (0, react.useState)("focus");
			const [state, setState] = (0, react.useState)(null);
			const [focus, setFocus] = (0, react.useState)("");
			const [constraints, setConstraints] = (0, react.useState)("");
			const [horizon, setHorizon] = (0, react.useState)("quarter");
			const [workspace, setWorkspace] = (0, react.useState)("");
			const [options, setOptions] = (0, react.useState)(null);
			const [chosen, setChosen] = (0, react.useState)(null);
			const [status, setStatus] = (0, react.useState)(null);
			const [busy, setBusy] = (0, react.useState)(false);

			(0, react.useEffect)(() => {
				fetchState().then((body) => {
					setState(body);
					if (body.generating) { setStep("generating"); return; }
					if (body.lastResult?.options?.length > 0) {
						setOptions(body.lastResult.options);
						setFocus(body.lastResult.focus ?? "");
						setWorkspace(body.lastResult.workspace ?? "");
						setStep("compare");
					}
				}).catch(() => {});
			}, []);

			const startGeneration = () => {
				setStep("generating");
				setStatus(null);
				generate({ focus, workspace, constraints, horizon }).catch((cause) => {
					setStatus({ kind: "error", text: `${t("error.generic")}: ${cause instanceof Error ? cause.message : String(cause)}` });
					setStep("focus");
				});
			};
			(0, react.useEffect)(() => { onGeneratingChange?.(step === "generating"); }, [step, onGeneratingChange]);
			// Poll while generating — the host runs the generation as a background
			// job, so the panel can close and reopen without losing it.
			(0, react.useEffect)(() => {
				if (step !== "generating") return;
				const timer = window.setInterval(() => {
					pollState().then((body) => {
						if (body.generating) return;
						window.clearInterval(timer);
						if (body.generateError) {
							setStatus({ kind: "error", text: `${t("error.generic")}: ${body.generateError}` });
							setStep("focus");
						} else if (body.lastResult?.options) {
							setOptions(body.lastResult.options);
							setFocus(body.lastResult.focus ?? focus);
							setStep("compare");
						}
					}).catch(() => {});
				}, 3000);
				return () => window.clearInterval(timer);
			}, [step]);

			const exportChosen = () => {
				if (chosen === null || workspace === "") return;
				setBusy(true);
				setStatus(null);
				exportGoal({ option: chosen, workspace, focus }).then((body) => {
					setStatus({ kind: "ok", text: `${t("action.exported")} \u2192 ${body.path}` });
					setStep("chosen");
				}).catch((cause) => {
					setStatus({ kind: "error", text: `${t("error.generic")}: ${cause instanceof Error ? cause.message : String(cause)}` });
				}).finally(() => setBusy(false));
			};

			return (0, react_jsx_runtime.jsxs)("div", {
				className: "rgi-scrim",
				onClick: (event) => { if (event.target === event.currentTarget) onClose(); },
				children: [
					(0, react_jsx_runtime.jsxs)("div", {
						className: "rgi-card",
						"aria-label": t("panel.title"),
						children: [
							(0, react_jsx_runtime.jsxs)("div", {
								className: "rgi-head",
								children: [
									(0, react_jsx_runtime.jsx)("span", { className: "rgi-title", children: t("panel.title") }),
									(0, react_jsx_runtime.jsx)("button", { type: "button", className: "rgi-close", "aria-label": t("action.close"), onClick: onClose, children: "\u00d7" })
								]
							}),
							(0, react_jsx_runtime.jsx)(Stepper, { step }),
							(0, react_jsx_runtime.jsx)("div", {
								className: "rgi-body",
								children: step === "focus" ? (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, {
									children: [
										(0, react_jsx_runtime.jsxs)("div", {
											className: "rgi-field",
											children: [
												(0, react_jsx_runtime.jsx)("label", { className: "rgi-label", children: t("focus.label") }),
												(0, react_jsx_runtime.jsx)("textarea", {
													className: "rgi-textarea",
													placeholder: t("focus.placeholder"),
													value: focus,
													onChange: (event) => setFocus(event.target.value)
												})
											]
										}),
										(0, react_jsx_runtime.jsxs)("div", {
											className: "rgi-row",
											children: [
												(0, react_jsx_runtime.jsxs)("div", {
													className: "rgi-field",
													children: [
														(0, react_jsx_runtime.jsx)("label", { className: "rgi-label", children: t("focus.workspace") }),
														(0, react_jsx_runtime.jsxs)("select", {
															className: "rgi-select",
															value: workspace,
															onChange: (event) => setWorkspace(event.target.value),
															children: [
																(0, react_jsx_runtime.jsx)("option", { value: "", disabled: true, children: t("focus.workspacePlaceholder") }),
																...(state?.workspaces ?? []).map((slug) => (0, react_jsx_runtime.jsx)("option", { value: slug, children: slug }, slug))
															]
														})
													]
												}),
												(0, react_jsx_runtime.jsxs)("div", {
													className: "rgi-field",
													children: [
														(0, react_jsx_runtime.jsx)("label", { className: "rgi-label", children: t("focus.horizon") }),
														(0, react_jsx_runtime.jsxs)("select", {
															className: "rgi-select",
															value: horizon,
															onChange: (event) => setHorizon(event.target.value),
															children: [
																(0, react_jsx_runtime.jsx)("option", { value: "sprint", children: "Sprint (2 weeks)" }),
																(0, react_jsx_runtime.jsx)("option", { value: "quarter", children: "Quarter" }),
																(0, react_jsx_runtime.jsx)("option", { value: "halfyear", children: "Half year" }),
																(0, react_jsx_runtime.jsx)("option", { value: "year", children: "Year" })
															]
														})
													]
												})
											]
										}),
										(0, react_jsx_runtime.jsxs)("div", {
											className: "rgi-field",
											children: [
												(0, react_jsx_runtime.jsx)("label", { className: "rgi-label", children: t("focus.constraints") }),
												(0, react_jsx_runtime.jsx)("input", {
													type: "text",
													className: "rgi-input",
													placeholder: t("focus.constraintsPlaceholder"),
													value: constraints,
													onChange: (event) => setConstraints(event.target.value)
												})
											]
										}),
										(0, react_jsx_runtime.jsx)("button", {
											type: "button",
											className: "rgi-generate",
											disabled: focus.trim() === "" || workspace === "",
											onClick: startGeneration,
											children: t("action.generate")
										})
									]
								}) : step === "generating" ? (0, react_jsx_runtime.jsxs)("div", {
									className: "rgi-genState",
									children: [
										(0, react_jsx_runtime.jsx)("div", { className: "rgi-genSpinner" }),
										(0, react_jsx_runtime.jsx)("span", { className: "rgi-genText", children: t("action.generating") }),
										(0, react_jsx_runtime.jsx)("span", { className: "rgi-genSub", children: focus })
									]
								}) : step === "compare" || step === "chosen" ? (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, {
									children: [
										(0, react_jsx_runtime.jsx)("div", {
											className: "rgi-options",
											children: (options ?? []).map((option, index) => (0, react_jsx_runtime.jsx)(OptionCard, {
												option,
												chosen: chosen?.name === option.name,
												onChoose: (pick) => { setChosen(pick); setStatus(null); }
											}, `${option.name}-${index}`))
										}),
										step === "chosen" ? (0, react_jsx_runtime.jsx)("button", {
											type: "button",
											className: "rgi-chooseBtn",
											style: { marginTop: 12 },
											onClick: () => { setStep("focus"); setOptions(null); setChosen(null); setStatus(null); },
											children: t("action.newRound")
										}) : null
									]
								}) : null
							}),
							(0, react_jsx_runtime.jsxs)("div", {
								className: "rgi-footer",
								children: [
									(0, react_jsx_runtime.jsx)("span", { className: status?.kind === "error" ? "rgi-status rgi-statusErr" : status?.kind === "ok" ? "rgi-status rgi-statusOk" : "rgi-status", role: status?.kind === "error" ? "alert" : "status", children: status?.text ?? "" }),
									chosen !== null && workspace !== "" && step !== "chosen" ? (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										className: "rgi-actionBtn rgi-actionPrimary",
										disabled: busy,
										onClick: exportChosen,
										children: busy ? "\u2026" : `${t("action.export")} \u2192 ${workspace}`
									}) : null
								]
							})
						]
					})
				]
			});
		}
		//#endregion
		//#region lib/index.js
		const inject = ["locale"];
		function apply(ctx) {
			ctx.effect(() => ctx.locale.register(NS, { en, zh }), "rich-ideas: dictionaries");

			let open = false;
			let generating = false;
			let listeners = new Set();
			const setGenerating = (value) => {
				if (generating === value) return;
				generating = value;
				const entry = document.querySelector(`[${ENTRY_ATTR}]`);
				if (entry !== null) {
					if (value) entry.setAttribute("data-generating", "true");
					else entry.removeAttribute("data-generating");
				}
			};
			const isOpen = () => open;
			const subscribe = (listener) => { listeners.add(listener); return () => listeners.delete(listener); };
			const setOpen = (value) => {
				if (open === value) return;
				open = value;
				for (const listener of [...listeners]) listener();
			};

			let container;
			let root;
			const mountPanel = () => {
				container = document.createElement("div");
				container.dataset.dshPlugin = "generative-ideas";
				container.dataset.dshPart = "panel-root";
				document.body.appendChild(container);
				root = react_dom_client.createRoot(container);
				root.render((0, react_jsx_runtime.jsx)(IdeasPanel, { onClose: () => teardownPanel(), onGeneratingChange: setGenerating }));
			};
			const teardownPanel = () => {
				setOpen(false);
				root?.unmount();
				root = undefined;
				container?.remove();
				container = undefined;
			};

			const SIDEBAR_ROW_SELECTOR = "[class*=\"sessionRow\"], [class*=\"projectRow\"], [class*=\"searchResultRow\"], [class*=\"searchResultWorkspace\"], [class*=\"newSession\"]";
			const onSidebarClick = (event) => {
				if (!open) return;
				const target = event.target;
				if (target !== null && target.closest?.(SIDEBAR_ROW_SELECTOR) !== null) teardownPanel();
			};
			document.addEventListener("click", onSidebarClick, true);

			const disposeEntry = mountSidebarEntry(
				() => { if (open) teardownPanel(); else { setOpen(true); mountPanel(); } },
				isOpen,
				subscribe
			);

			return () => {
				document.removeEventListener("click", onSidebarClick, true);
				teardownPanel();
				disposeEntry();
			};
		}
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
