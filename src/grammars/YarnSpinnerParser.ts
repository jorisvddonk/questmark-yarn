// @ts-nocheck
// Generated from src/grammars/YarnSpinnerParser.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { YarnSpinnerParserListener } from "./YarnSpinnerParserListener";
import { YarnSpinnerParserVisitor } from "./YarnSpinnerParserVisitor";


export class YarnSpinnerParser extends Parser {
	public static readonly INDENT = 1;
	public static readonly DEDENT = 2;
	public static readonly BLANK_LINE_FOLLOWING_OPTION = 3;
	public static readonly WS = 4;
	public static readonly COMMENT = 5;
	public static readonly NEWLINE = 6;
	public static readonly HEADER_WHEN = 7;
	public static readonly HEADER_TITLE = 8;
	public static readonly ID = 9;
	public static readonly BODY_START = 10;
	public static readonly HEADER_DELIMITER = 11;
	public static readonly HASHTAG = 12;
	public static readonly HEADER_WHEN_UNKNOWN = 13;
	public static readonly HEADER_TEXT = 14;
	public static readonly BODY_WS = 15;
	public static readonly BODY_END = 16;
	public static readonly SHORTCUT_ARROW = 17;
	public static readonly LINE_GROUP_ARROW = 18;
	public static readonly COMMAND_START = 19;
	public static readonly EXPRESSION_START = 20;
	public static readonly ESCAPED_ANY = 21;
	public static readonly TEXT_ESCAPE = 22;
	public static readonly TEXT_COMMENT = 23;
	public static readonly TEXT = 24;
	public static readonly UNESCAPABLE_CHARACTER = 25;
	public static readonly TEXT_COMMANDHASHTAG_WS = 26;
	public static readonly TEXT_COMMANDHASHTAG_COMMENT = 27;
	public static readonly TEXT_COMMANDHASHTAG_ERROR = 28;
	public static readonly HASHTAG_WS = 29;
	public static readonly HASHTAG_TEXT = 30;
	public static readonly EXPR_WS = 31;
	public static readonly EXPRESSION_WHEN_ALWAYS = 32;
	public static readonly KEYWORD_TRUE = 33;
	public static readonly KEYWORD_FALSE = 34;
	public static readonly KEYWORD_NULL = 35;
	public static readonly NUMBER = 36;
	public static readonly OPERATOR_ASSIGNMENT = 37;
	public static readonly OPERATOR_LOGICAL_LESS_THAN_EQUALS = 38;
	public static readonly OPERATOR_LOGICAL_GREATER_THAN_EQUALS = 39;
	public static readonly OPERATOR_LOGICAL_EQUALS = 40;
	public static readonly OPERATOR_LOGICAL_LESS = 41;
	public static readonly OPERATOR_LOGICAL_GREATER = 42;
	public static readonly OPERATOR_LOGICAL_NOT_EQUALS = 43;
	public static readonly OPERATOR_LOGICAL_AND = 44;
	public static readonly OPERATOR_LOGICAL_OR = 45;
	public static readonly OPERATOR_LOGICAL_XOR = 46;
	public static readonly OPERATOR_LOGICAL_NOT = 47;
	public static readonly OPERATOR_MATHS_ADDITION_EQUALS = 48;
	public static readonly OPERATOR_MATHS_SUBTRACTION_EQUALS = 49;
	public static readonly OPERATOR_MATHS_MULTIPLICATION_EQUALS = 50;
	public static readonly OPERATOR_MATHS_MODULUS_EQUALS = 51;
	public static readonly OPERATOR_MATHS_DIVISION_EQUALS = 52;
	public static readonly OPERATOR_MATHS_ADDITION = 53;
	public static readonly OPERATOR_MATHS_SUBTRACTION = 54;
	public static readonly OPERATOR_MATHS_MULTIPLICATION = 55;
	public static readonly OPERATOR_MATHS_DIVISION = 56;
	public static readonly OPERATOR_MATHS_MODULUS = 57;
	public static readonly LPAREN = 58;
	public static readonly RPAREN = 59;
	public static readonly COMMA = 60;
	public static readonly EXPRESSION_AS = 61;
	public static readonly STRING = 62;
	public static readonly FUNC_ID = 63;
	public static readonly EXPRESSION_END = 64;
	public static readonly VAR_ID = 65;
	public static readonly DOT = 66;
	public static readonly COMMAND_NEWLINE = 67;
	public static readonly COMMAND_WS = 68;
	public static readonly COMMAND_IF = 69;
	public static readonly COMMAND_ELSEIF = 70;
	public static readonly COMMAND_ELSE = 71;
	public static readonly COMMAND_SET = 72;
	public static readonly COMMAND_ENDIF = 73;
	public static readonly COMMAND_CALL = 74;
	public static readonly COMMAND_DECLARE = 75;
	public static readonly COMMAND_JUMP = 76;
	public static readonly COMMAND_DETOUR = 77;
	public static readonly COMMAND_RETURN = 78;
	public static readonly COMMAND_ENUM = 79;
	public static readonly COMMAND_CASE = 80;
	public static readonly COMMAND_ENDENUM = 81;
	public static readonly COMMAND_ONCE = 82;
	public static readonly COMMAND_ENDONCE = 83;
	public static readonly COMMAND_LOCAL = 84;
	public static readonly COMMAND_END = 85;
	public static readonly COMMAND_TEXT_NEWLINE = 86;
	public static readonly COMMAND_TEXT = 87;
	public static readonly COMMAND_ID_WS = 88;
	public static readonly COMMAND_ID_NEWLINE = 89;
	public static readonly COMMAND_ID_OR_EXPRESSION_WS = 90;
	public static readonly TEXT_ESCAPED_SPEAKER = 91;
	public static readonly TYPE_STRING = 92;
	public static readonly TYPE_NUMBER = 93;
	public static readonly TYPE_BOOL = 94;
	public static readonly RULE_dialogue = 0;
	public static readonly RULE_file_hashtag = 1;
	public static readonly RULE_node = 2;
	public static readonly RULE_title_header = 3;
	public static readonly RULE_when_header = 4;
	public static readonly RULE_header = 5;
	public static readonly RULE_header_when_expression = 6;
	public static readonly RULE_body = 7;
	public static readonly RULE_statement = 8;
	public static readonly RULE_line_statement = 9;
	public static readonly RULE_line_formatted_text = 10;
	public static readonly RULE_hashtag = 11;
	public static readonly RULE_line_condition = 12;
	public static readonly RULE_expression = 13;
	public static readonly RULE_value = 14;
	public static readonly RULE_variable = 15;
	public static readonly RULE_function_call = 16;
	public static readonly RULE_typeMemberReference = 17;
	public static readonly RULE_if_statement = 18;
	public static readonly RULE_if_clause = 19;
	public static readonly RULE_else_if_clause = 20;
	public static readonly RULE_else_clause = 21;
	public static readonly RULE_set_statement = 22;
	public static readonly RULE_call_statement = 23;
	public static readonly RULE_command_statement = 24;
	public static readonly RULE_command_formatted_text = 25;
	public static readonly RULE_shortcut_option_statement = 26;
	public static readonly RULE_shortcut_option = 27;
	public static readonly RULE_line_group_statement = 28;
	public static readonly RULE_line_group_item = 29;
	public static readonly RULE_declare_statement = 30;
	public static readonly RULE_enum_statement = 31;
	public static readonly RULE_enum_case_statement = 32;
	public static readonly RULE_jump_statement = 33;
	public static readonly RULE_return_statement = 34;
	public static readonly RULE_once_statement = 35;
	public static readonly RULE_once_primary_clause = 36;
	public static readonly RULE_once_alternate_clause = 37;
	public static readonly RULE_structured_command = 38;
	public static readonly RULE_structured_command_value = 39;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"dialogue", "file_hashtag", "node", "title_header", "when_header", "header", 
		"header_when_expression", "body", "statement", "line_statement", "line_formatted_text", 
		"hashtag", "line_condition", "expression", "value", "variable", "function_call", 
		"typeMemberReference", "if_statement", "if_clause", "else_if_clause", 
		"else_clause", "set_statement", "call_statement", "command_statement", 
		"command_formatted_text", "shortcut_option_statement", "shortcut_option", 
		"line_group_statement", "line_group_item", "declare_statement", "enum_statement", 
		"enum_case_statement", "jump_statement", "return_statement", "once_statement", 
		"once_primary_clause", "once_alternate_clause", "structured_command", 
		"structured_command_value",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		"'when'", "'title'", undefined, "'---'", undefined, "'#'", undefined, 
		undefined, undefined, "'==='", "'->'", "'=>'", "'<<'", undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, "'always'", "'true'", "'false'", "'null'", 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, "'+='", "'-='", 
		"'*='", "'%='", "'/='", "'+'", "'-'", "'*'", "'/'", "'%'", "'('", "')'", 
		"','", "'as'", undefined, undefined, "'}'", undefined, "'.'", undefined, 
		undefined, undefined, undefined, "'else'", undefined, "'endif'", undefined, 
		undefined, undefined, undefined, "'return'", undefined, undefined, "'endenum'", 
		"'once'", "'endonce'", "'local'", undefined, undefined, undefined, undefined, 
		undefined, undefined, "'\\'", "'string'", "'number'", "'bool'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "INDENT", "DEDENT", "BLANK_LINE_FOLLOWING_OPTION", "WS", "COMMENT", 
		"NEWLINE", "HEADER_WHEN", "HEADER_TITLE", "ID", "BODY_START", "HEADER_DELIMITER", 
		"HASHTAG", "HEADER_WHEN_UNKNOWN", "HEADER_TEXT", "BODY_WS", "BODY_END", 
		"SHORTCUT_ARROW", "LINE_GROUP_ARROW", "COMMAND_START", "EXPRESSION_START", 
		"ESCAPED_ANY", "TEXT_ESCAPE", "TEXT_COMMENT", "TEXT", "UNESCAPABLE_CHARACTER", 
		"TEXT_COMMANDHASHTAG_WS", "TEXT_COMMANDHASHTAG_COMMENT", "TEXT_COMMANDHASHTAG_ERROR", 
		"HASHTAG_WS", "HASHTAG_TEXT", "EXPR_WS", "EXPRESSION_WHEN_ALWAYS", "KEYWORD_TRUE", 
		"KEYWORD_FALSE", "KEYWORD_NULL", "NUMBER", "OPERATOR_ASSIGNMENT", "OPERATOR_LOGICAL_LESS_THAN_EQUALS", 
		"OPERATOR_LOGICAL_GREATER_THAN_EQUALS", "OPERATOR_LOGICAL_EQUALS", "OPERATOR_LOGICAL_LESS", 
		"OPERATOR_LOGICAL_GREATER", "OPERATOR_LOGICAL_NOT_EQUALS", "OPERATOR_LOGICAL_AND", 
		"OPERATOR_LOGICAL_OR", "OPERATOR_LOGICAL_XOR", "OPERATOR_LOGICAL_NOT", 
		"OPERATOR_MATHS_ADDITION_EQUALS", "OPERATOR_MATHS_SUBTRACTION_EQUALS", 
		"OPERATOR_MATHS_MULTIPLICATION_EQUALS", "OPERATOR_MATHS_MODULUS_EQUALS", 
		"OPERATOR_MATHS_DIVISION_EQUALS", "OPERATOR_MATHS_ADDITION", "OPERATOR_MATHS_SUBTRACTION", 
		"OPERATOR_MATHS_MULTIPLICATION", "OPERATOR_MATHS_DIVISION", "OPERATOR_MATHS_MODULUS", 
		"LPAREN", "RPAREN", "COMMA", "EXPRESSION_AS", "STRING", "FUNC_ID", "EXPRESSION_END", 
		"VAR_ID", "DOT", "COMMAND_NEWLINE", "COMMAND_WS", "COMMAND_IF", "COMMAND_ELSEIF", 
		"COMMAND_ELSE", "COMMAND_SET", "COMMAND_ENDIF", "COMMAND_CALL", "COMMAND_DECLARE", 
		"COMMAND_JUMP", "COMMAND_DETOUR", "COMMAND_RETURN", "COMMAND_ENUM", "COMMAND_CASE", 
		"COMMAND_ENDENUM", "COMMAND_ONCE", "COMMAND_ENDONCE", "COMMAND_LOCAL", 
		"COMMAND_END", "COMMAND_TEXT_NEWLINE", "COMMAND_TEXT", "COMMAND_ID_WS", 
		"COMMAND_ID_NEWLINE", "COMMAND_ID_OR_EXPRESSION_WS", "TEXT_ESCAPED_SPEAKER", 
		"TYPE_STRING", "TYPE_NUMBER", "TYPE_BOOL",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(YarnSpinnerParser._LITERAL_NAMES, YarnSpinnerParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return YarnSpinnerParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "YarnSpinnerParser.g4"; }

	// @Override
	public get ruleNames(): string[] { return YarnSpinnerParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return YarnSpinnerParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(YarnSpinnerParser._ATN, this);
	}
	// @RuleVersion(0)
	public dialogue(): DialogueContext {
		let _localctx: DialogueContext = new DialogueContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, YarnSpinnerParser.RULE_dialogue);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 83;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === YarnSpinnerParser.HASHTAG) {
				{
				{
				this.state = 80;
				this.file_hashtag();
				}
				}
				this.state = 85;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
			this.state = 87;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 86;
				this.node();
				}
				}
				this.state = 89;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << YarnSpinnerParser.HEADER_WHEN) | (1 << YarnSpinnerParser.HEADER_TITLE) | (1 << YarnSpinnerParser.ID))) !== 0));
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public file_hashtag(): File_hashtagContext {
		let _localctx: File_hashtagContext = new File_hashtagContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, YarnSpinnerParser.RULE_file_hashtag);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 91;
			this.match(YarnSpinnerParser.HASHTAG);
			this.state = 92;
			_localctx._text = this.match(YarnSpinnerParser.HASHTAG_TEXT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public node(): NodeContext {
		let _localctx: NodeContext = new NodeContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, YarnSpinnerParser.RULE_node);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 97;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				this.state = 97;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case YarnSpinnerParser.ID:
					{
					this.state = 94;
					this.header();
					}
					break;
				case YarnSpinnerParser.HEADER_WHEN:
					{
					this.state = 95;
					this.when_header();
					}
					break;
				case YarnSpinnerParser.HEADER_TITLE:
					{
					this.state = 96;
					this.title_header();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 99;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << YarnSpinnerParser.HEADER_WHEN) | (1 << YarnSpinnerParser.HEADER_TITLE) | (1 << YarnSpinnerParser.ID))) !== 0));
			this.state = 101;
			this.match(YarnSpinnerParser.BODY_START);
			this.state = 102;
			this.body();
			this.state = 103;
			this.match(YarnSpinnerParser.BODY_END);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public title_header(): Title_headerContext {
		let _localctx: Title_headerContext = new Title_headerContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, YarnSpinnerParser.RULE_title_header);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 105;
			this.match(YarnSpinnerParser.HEADER_TITLE);
			this.state = 106;
			this.match(YarnSpinnerParser.HEADER_DELIMITER);
			this.state = 107;
			_localctx._title = this.match(YarnSpinnerParser.ID);
			this.state = 108;
			this.match(YarnSpinnerParser.NEWLINE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public when_header(): When_headerContext {
		let _localctx: When_headerContext = new When_headerContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, YarnSpinnerParser.RULE_when_header);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 110;
			this.match(YarnSpinnerParser.HEADER_WHEN);
			this.state = 111;
			this.match(YarnSpinnerParser.HEADER_DELIMITER);
			this.state = 112;
			_localctx._header_expression = this.header_when_expression();
			this.state = 113;
			this.match(YarnSpinnerParser.NEWLINE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public header(): HeaderContext {
		let _localctx: HeaderContext = new HeaderContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, YarnSpinnerParser.RULE_header);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 115;
			_localctx._header_key = this.match(YarnSpinnerParser.ID);
			this.state = 116;
			this.match(YarnSpinnerParser.HEADER_DELIMITER);
			this.state = 118;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === YarnSpinnerParser.HEADER_TEXT) {
				{
				this.state = 117;
				_localctx._header_value = this.match(YarnSpinnerParser.HEADER_TEXT);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public header_when_expression(): Header_when_expressionContext {
		let _localctx: Header_when_expressionContext = new Header_when_expressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, YarnSpinnerParser.RULE_header_when_expression);
		let _la: number;
		try {
			this.state = 127;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case YarnSpinnerParser.KEYWORD_TRUE:
			case YarnSpinnerParser.KEYWORD_FALSE:
			case YarnSpinnerParser.NUMBER:
			case YarnSpinnerParser.OPERATOR_LOGICAL_NOT:
			case YarnSpinnerParser.OPERATOR_MATHS_SUBTRACTION:
			case YarnSpinnerParser.LPAREN:
			case YarnSpinnerParser.STRING:
			case YarnSpinnerParser.FUNC_ID:
			case YarnSpinnerParser.VAR_ID:
			case YarnSpinnerParser.DOT:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 120;
				this.expression(0);
				}
				break;
			case YarnSpinnerParser.EXPRESSION_WHEN_ALWAYS:
				this.enterOuterAlt(_localctx, 2);
				{
				{
				this.state = 121;
				_localctx._always = this.match(YarnSpinnerParser.EXPRESSION_WHEN_ALWAYS);
				}
				}
				break;
			case YarnSpinnerParser.COMMAND_ONCE:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 122;
				_localctx._once = this.match(YarnSpinnerParser.COMMAND_ONCE);
				this.state = 125;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === YarnSpinnerParser.COMMAND_IF) {
					{
					this.state = 123;
					this.match(YarnSpinnerParser.COMMAND_IF);
					this.state = 124;
					this.expression(0);
					}
				}

				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public body(): BodyContext {
		let _localctx: BodyContext = new BodyContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, YarnSpinnerParser.RULE_body);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 132;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << YarnSpinnerParser.INDENT) | (1 << YarnSpinnerParser.SHORTCUT_ARROW) | (1 << YarnSpinnerParser.LINE_GROUP_ARROW) | (1 << YarnSpinnerParser.COMMAND_START) | (1 << YarnSpinnerParser.EXPRESSION_START) | (1 << YarnSpinnerParser.TEXT))) !== 0)) {
				{
				{
				this.state = 129;
				this.statement();
				}
				}
				this.state = 134;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public statement(): StatementContext {
		let _localctx: StatementContext = new StatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, YarnSpinnerParser.RULE_statement);
		let _la: number;
		try {
			this.state = 155;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 9, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 135;
				this.line_statement();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 136;
				this.if_statement();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 137;
				this.set_statement();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 138;
				this.shortcut_option_statement();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 139;
				this.call_statement();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 140;
				this.command_statement();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 141;
				this.declare_statement();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 142;
				this.enum_statement();
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 143;
				this.jump_statement();
				}
				break;

			case 10:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 144;
				this.return_statement();
				}
				break;

			case 11:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 145;
				this.line_group_statement();
				}
				break;

			case 12:
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 146;
				this.once_statement();
				}
				break;

			case 13:
				this.enterOuterAlt(_localctx, 13);
				{
				this.state = 147;
				this.match(YarnSpinnerParser.INDENT);
				this.state = 151;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << YarnSpinnerParser.INDENT) | (1 << YarnSpinnerParser.SHORTCUT_ARROW) | (1 << YarnSpinnerParser.LINE_GROUP_ARROW) | (1 << YarnSpinnerParser.COMMAND_START) | (1 << YarnSpinnerParser.EXPRESSION_START) | (1 << YarnSpinnerParser.TEXT))) !== 0)) {
					{
					{
					this.state = 148;
					this.statement();
					}
					}
					this.state = 153;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 154;
				this.match(YarnSpinnerParser.DEDENT);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public line_statement(): Line_statementContext {
		let _localctx: Line_statementContext = new Line_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, YarnSpinnerParser.RULE_line_statement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 157;
			this.line_formatted_text();
			this.state = 159;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === YarnSpinnerParser.COMMAND_START) {
				{
				this.state = 158;
				this.line_condition();
				}
			}

			this.state = 164;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === YarnSpinnerParser.HASHTAG) {
				{
				{
				this.state = 161;
				this.hashtag();
				}
				}
				this.state = 166;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 167;
			this.match(YarnSpinnerParser.NEWLINE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public line_formatted_text(): Line_formatted_textContext {
		let _localctx: Line_formatted_textContext = new Line_formatted_textContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, YarnSpinnerParser.RULE_line_formatted_text);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 178;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				this.state = 178;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case YarnSpinnerParser.TEXT:
					{
					this.state = 170;
					this._errHandler.sync(this);
					_alt = 1;
					do {
						switch (_alt) {
						case 1:
							{
							{
							this.state = 169;
							this.match(YarnSpinnerParser.TEXT);
							}
							}
							break;
						default:
							throw new NoViableAltException(this);
						}
						this.state = 172;
						this._errHandler.sync(this);
						_alt = this.interpreter.adaptivePredict(this._input, 12, this._ctx);
					} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
					}
					break;
				case YarnSpinnerParser.EXPRESSION_START:
					{
					this.state = 174;
					this.match(YarnSpinnerParser.EXPRESSION_START);
					this.state = 175;
					this.expression(0);
					this.state = 176;
					this.match(YarnSpinnerParser.EXPRESSION_END);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 180;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === YarnSpinnerParser.EXPRESSION_START || _la === YarnSpinnerParser.TEXT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public hashtag(): HashtagContext {
		let _localctx: HashtagContext = new HashtagContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, YarnSpinnerParser.RULE_hashtag);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 182;
			this.match(YarnSpinnerParser.HASHTAG);
			this.state = 183;
			_localctx._text = this.match(YarnSpinnerParser.HASHTAG_TEXT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public line_condition(): Line_conditionContext {
		let _localctx: Line_conditionContext = new Line_conditionContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, YarnSpinnerParser.RULE_line_condition);
		let _la: number;
		try {
			this.state = 197;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 16, this._ctx) ) {
			case 1:
				_localctx = new LineConditionContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 185;
				this.match(YarnSpinnerParser.COMMAND_START);
				this.state = 186;
				this.match(YarnSpinnerParser.COMMAND_IF);
				this.state = 187;
				this.expression(0);
				this.state = 188;
				this.match(YarnSpinnerParser.COMMAND_END);
				}
				break;

			case 2:
				_localctx = new LineOnceConditionContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 190;
				this.match(YarnSpinnerParser.COMMAND_START);
				this.state = 191;
				this.match(YarnSpinnerParser.COMMAND_ONCE);
				this.state = 194;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === YarnSpinnerParser.COMMAND_IF) {
					{
					this.state = 192;
					this.match(YarnSpinnerParser.COMMAND_IF);
					this.state = 193;
					this.expression(0);
					}
				}

				this.state = 196;
				this.match(YarnSpinnerParser.COMMAND_END);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public expression(): ExpressionContext;
	public expression(_p: number): ExpressionContext;
	// @RuleVersion(0)
	public expression(_p?: number): ExpressionContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: ExpressionContext = new ExpressionContext(this._ctx, _parentState);
		let _prevctx: ExpressionContext = _localctx;
		let _startState: number = 26;
		this.enterRecursionRule(_localctx, 26, YarnSpinnerParser.RULE_expression, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 209;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case YarnSpinnerParser.LPAREN:
				{
				_localctx = new ExpParensContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;

				this.state = 200;
				this.match(YarnSpinnerParser.LPAREN);
				this.state = 201;
				this.expression(0);
				this.state = 202;
				this.match(YarnSpinnerParser.RPAREN);
				}
				break;
			case YarnSpinnerParser.OPERATOR_MATHS_SUBTRACTION:
				{
				_localctx = new ExpNegativeContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 204;
				(_localctx as ExpNegativeContext)._op = this.match(YarnSpinnerParser.OPERATOR_MATHS_SUBTRACTION);
				this.state = 205;
				this.expression(8);
				}
				break;
			case YarnSpinnerParser.OPERATOR_LOGICAL_NOT:
				{
				_localctx = new ExpNotContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 206;
				(_localctx as ExpNotContext)._op = this.match(YarnSpinnerParser.OPERATOR_LOGICAL_NOT);
				this.state = 207;
				this.expression(7);
				}
				break;
			case YarnSpinnerParser.KEYWORD_TRUE:
			case YarnSpinnerParser.KEYWORD_FALSE:
			case YarnSpinnerParser.NUMBER:
			case YarnSpinnerParser.STRING:
			case YarnSpinnerParser.FUNC_ID:
			case YarnSpinnerParser.VAR_ID:
			case YarnSpinnerParser.DOT:
				{
				_localctx = new ExpValueContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 208;
				this.value();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 228;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 19, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 226;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 18, this._ctx) ) {
					case 1:
						{
						_localctx = new ExpMultDivModContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, YarnSpinnerParser.RULE_expression);
						this.state = 211;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 212;
						(_localctx as ExpMultDivModContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(((((_la - 55)) & ~0x1F) === 0 && ((1 << (_la - 55)) & ((1 << (YarnSpinnerParser.OPERATOR_MATHS_MULTIPLICATION - 55)) | (1 << (YarnSpinnerParser.OPERATOR_MATHS_DIVISION - 55)) | (1 << (YarnSpinnerParser.OPERATOR_MATHS_MODULUS - 55)))) !== 0))) {
							(_localctx as ExpMultDivModContext)._op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 213;
						this.expression(7);
						}
						break;

					case 2:
						{
						_localctx = new ExpAddSubContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, YarnSpinnerParser.RULE_expression);
						this.state = 214;
						if (!(this.precpred(this._ctx, 5))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 5)");
						}
						this.state = 215;
						(_localctx as ExpAddSubContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(_la === YarnSpinnerParser.OPERATOR_MATHS_ADDITION || _la === YarnSpinnerParser.OPERATOR_MATHS_SUBTRACTION)) {
							(_localctx as ExpAddSubContext)._op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 216;
						this.expression(6);
						}
						break;

					case 3:
						{
						_localctx = new ExpComparisonContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, YarnSpinnerParser.RULE_expression);
						this.state = 217;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 218;
						(_localctx as ExpComparisonContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(((((_la - 38)) & ~0x1F) === 0 && ((1 << (_la - 38)) & ((1 << (YarnSpinnerParser.OPERATOR_LOGICAL_LESS_THAN_EQUALS - 38)) | (1 << (YarnSpinnerParser.OPERATOR_LOGICAL_GREATER_THAN_EQUALS - 38)) | (1 << (YarnSpinnerParser.OPERATOR_LOGICAL_LESS - 38)) | (1 << (YarnSpinnerParser.OPERATOR_LOGICAL_GREATER - 38)))) !== 0))) {
							(_localctx as ExpComparisonContext)._op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 219;
						this.expression(5);
						}
						break;

					case 4:
						{
						_localctx = new ExpEqualityContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, YarnSpinnerParser.RULE_expression);
						this.state = 220;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						this.state = 221;
						(_localctx as ExpEqualityContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(_la === YarnSpinnerParser.OPERATOR_LOGICAL_EQUALS || _la === YarnSpinnerParser.OPERATOR_LOGICAL_NOT_EQUALS)) {
							(_localctx as ExpEqualityContext)._op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 222;
						this.expression(4);
						}
						break;

					case 5:
						{
						_localctx = new ExpAndOrXorContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, YarnSpinnerParser.RULE_expression);
						this.state = 223;
						if (!(this.precpred(this._ctx, 2))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
						}
						this.state = 224;
						(_localctx as ExpAndOrXorContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(((((_la - 44)) & ~0x1F) === 0 && ((1 << (_la - 44)) & ((1 << (YarnSpinnerParser.OPERATOR_LOGICAL_AND - 44)) | (1 << (YarnSpinnerParser.OPERATOR_LOGICAL_OR - 44)) | (1 << (YarnSpinnerParser.OPERATOR_LOGICAL_XOR - 44)))) !== 0))) {
							(_localctx as ExpAndOrXorContext)._op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 225;
						this.expression(3);
						}
						break;
					}
					}
				}
				this.state = 230;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 19, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public value(): ValueContext {
		let _localctx: ValueContext = new ValueContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, YarnSpinnerParser.RULE_value);
		try {
			this.state = 238;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 20, this._ctx) ) {
			case 1:
				_localctx = new ValueNumberContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 231;
				this.match(YarnSpinnerParser.NUMBER);
				}
				break;

			case 2:
				_localctx = new ValueTrueContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 232;
				this.match(YarnSpinnerParser.KEYWORD_TRUE);
				}
				break;

			case 3:
				_localctx = new ValueFalseContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 233;
				this.match(YarnSpinnerParser.KEYWORD_FALSE);
				}
				break;

			case 4:
				_localctx = new ValueVarContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 234;
				this.variable();
				}
				break;

			case 5:
				_localctx = new ValueStringContext(_localctx);
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 235;
				this.match(YarnSpinnerParser.STRING);
				}
				break;

			case 6:
				_localctx = new ValueFuncContext(_localctx);
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 236;
				this.function_call();
				}
				break;

			case 7:
				_localctx = new ValueTypeMemberReferenceContext(_localctx);
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 237;
				this.typeMemberReference();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public variable(): VariableContext {
		let _localctx: VariableContext = new VariableContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, YarnSpinnerParser.RULE_variable);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 240;
			this.match(YarnSpinnerParser.VAR_ID);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public function_call(): Function_callContext {
		let _localctx: Function_callContext = new Function_callContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, YarnSpinnerParser.RULE_function_call);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 242;
			this.match(YarnSpinnerParser.FUNC_ID);
			this.state = 243;
			this.match(YarnSpinnerParser.LPAREN);
			this.state = 245;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & ((1 << (YarnSpinnerParser.KEYWORD_TRUE - 33)) | (1 << (YarnSpinnerParser.KEYWORD_FALSE - 33)) | (1 << (YarnSpinnerParser.NUMBER - 33)) | (1 << (YarnSpinnerParser.OPERATOR_LOGICAL_NOT - 33)) | (1 << (YarnSpinnerParser.OPERATOR_MATHS_SUBTRACTION - 33)) | (1 << (YarnSpinnerParser.LPAREN - 33)) | (1 << (YarnSpinnerParser.STRING - 33)) | (1 << (YarnSpinnerParser.FUNC_ID - 33)))) !== 0) || _la === YarnSpinnerParser.VAR_ID || _la === YarnSpinnerParser.DOT) {
				{
				this.state = 244;
				this.expression(0);
				}
			}

			this.state = 251;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === YarnSpinnerParser.COMMA) {
				{
				{
				this.state = 247;
				this.match(YarnSpinnerParser.COMMA);
				this.state = 248;
				this.expression(0);
				}
				}
				this.state = 253;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 254;
			this.match(YarnSpinnerParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public typeMemberReference(): TypeMemberReferenceContext {
		let _localctx: TypeMemberReferenceContext = new TypeMemberReferenceContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, YarnSpinnerParser.RULE_typeMemberReference);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 257;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === YarnSpinnerParser.FUNC_ID) {
				{
				this.state = 256;
				_localctx._typeName = this.match(YarnSpinnerParser.FUNC_ID);
				}
			}

			this.state = 259;
			this.match(YarnSpinnerParser.DOT);
			this.state = 260;
			_localctx._memberName = this.match(YarnSpinnerParser.FUNC_ID);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public if_statement(): If_statementContext {
		let _localctx: If_statementContext = new If_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 36, YarnSpinnerParser.RULE_if_statement);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 262;
			this.if_clause();
			this.state = 266;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 24, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 263;
					this.else_if_clause();
					}
					}
				}
				this.state = 268;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 24, this._ctx);
			}
			this.state = 270;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 25, this._ctx) ) {
			case 1:
				{
				this.state = 269;
				this.else_clause();
				}
				break;
			}
			this.state = 272;
			this.match(YarnSpinnerParser.COMMAND_START);
			this.state = 273;
			this.match(YarnSpinnerParser.COMMAND_ENDIF);
			this.state = 274;
			this.match(YarnSpinnerParser.COMMAND_END);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public if_clause(): If_clauseContext {
		let _localctx: If_clauseContext = new If_clauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 38, YarnSpinnerParser.RULE_if_clause);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 276;
			this.match(YarnSpinnerParser.COMMAND_START);
			this.state = 277;
			this.match(YarnSpinnerParser.COMMAND_IF);
			this.state = 278;
			this.expression(0);
			this.state = 279;
			this.match(YarnSpinnerParser.COMMAND_END);
			this.state = 283;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 26, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 280;
					this.statement();
					}
					}
				}
				this.state = 285;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 26, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public else_if_clause(): Else_if_clauseContext {
		let _localctx: Else_if_clauseContext = new Else_if_clauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 40, YarnSpinnerParser.RULE_else_if_clause);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 286;
			this.match(YarnSpinnerParser.COMMAND_START);
			this.state = 287;
			this.match(YarnSpinnerParser.COMMAND_ELSEIF);
			this.state = 288;
			this.expression(0);
			this.state = 289;
			this.match(YarnSpinnerParser.COMMAND_END);
			this.state = 293;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 27, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 290;
					this.statement();
					}
					}
				}
				this.state = 295;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 27, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public else_clause(): Else_clauseContext {
		let _localctx: Else_clauseContext = new Else_clauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 42, YarnSpinnerParser.RULE_else_clause);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 296;
			this.match(YarnSpinnerParser.COMMAND_START);
			this.state = 297;
			this.match(YarnSpinnerParser.COMMAND_ELSE);
			this.state = 298;
			this.match(YarnSpinnerParser.COMMAND_END);
			this.state = 302;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 28, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 299;
					this.statement();
					}
					}
				}
				this.state = 304;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 28, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public set_statement(): Set_statementContext {
		let _localctx: Set_statementContext = new Set_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 44, YarnSpinnerParser.RULE_set_statement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 305;
			this.match(YarnSpinnerParser.COMMAND_START);
			this.state = 306;
			this.match(YarnSpinnerParser.COMMAND_SET);
			this.state = 307;
			this.variable();
			this.state = 308;
			_localctx._op = this._input.LT(1);
			_la = this._input.LA(1);
			if (!(((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & ((1 << (YarnSpinnerParser.OPERATOR_ASSIGNMENT - 37)) | (1 << (YarnSpinnerParser.OPERATOR_MATHS_ADDITION_EQUALS - 37)) | (1 << (YarnSpinnerParser.OPERATOR_MATHS_SUBTRACTION_EQUALS - 37)) | (1 << (YarnSpinnerParser.OPERATOR_MATHS_MULTIPLICATION_EQUALS - 37)) | (1 << (YarnSpinnerParser.OPERATOR_MATHS_MODULUS_EQUALS - 37)) | (1 << (YarnSpinnerParser.OPERATOR_MATHS_DIVISION_EQUALS - 37)))) !== 0))) {
				_localctx._op = this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 309;
			this.expression(0);
			this.state = 310;
			this.match(YarnSpinnerParser.COMMAND_END);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public call_statement(): Call_statementContext {
		let _localctx: Call_statementContext = new Call_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 46, YarnSpinnerParser.RULE_call_statement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 312;
			this.match(YarnSpinnerParser.COMMAND_START);
			this.state = 313;
			this.match(YarnSpinnerParser.COMMAND_CALL);
			this.state = 314;
			this.function_call();
			this.state = 315;
			this.match(YarnSpinnerParser.COMMAND_END);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public command_statement(): Command_statementContext {
		let _localctx: Command_statementContext = new Command_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 48, YarnSpinnerParser.RULE_command_statement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 317;
			this.match(YarnSpinnerParser.COMMAND_START);
			this.state = 318;
			this.command_formatted_text();
			this.state = 319;
			this.match(YarnSpinnerParser.COMMAND_END);
			{
			this.state = 323;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === YarnSpinnerParser.HASHTAG) {
				{
				{
				this.state = 320;
				this.hashtag();
				}
				}
				this.state = 325;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public command_formatted_text(): Command_formatted_textContext {
		let _localctx: Command_formatted_textContext = new Command_formatted_textContext(this._ctx, this.state);
		this.enterRule(_localctx, 50, YarnSpinnerParser.RULE_command_formatted_text);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 331;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				this.state = 331;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case YarnSpinnerParser.COMMAND_TEXT:
					{
					this.state = 326;
					this.match(YarnSpinnerParser.COMMAND_TEXT);
					}
					break;
				case YarnSpinnerParser.EXPRESSION_START:
					{
					this.state = 327;
					this.match(YarnSpinnerParser.EXPRESSION_START);
					this.state = 328;
					this.expression(0);
					this.state = 329;
					this.match(YarnSpinnerParser.EXPRESSION_END);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 333;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === YarnSpinnerParser.EXPRESSION_START || _la === YarnSpinnerParser.COMMAND_TEXT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public shortcut_option_statement(): Shortcut_option_statementContext {
		let _localctx: Shortcut_option_statementContext = new Shortcut_option_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 52, YarnSpinnerParser.RULE_shortcut_option_statement);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 338;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 32, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 335;
					this.shortcut_option();
					}
					}
				}
				this.state = 340;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 32, this._ctx);
			}
			{
			this.state = 341;
			this.shortcut_option();
			this.state = 343;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === YarnSpinnerParser.BLANK_LINE_FOLLOWING_OPTION) {
				{
				this.state = 342;
				this.match(YarnSpinnerParser.BLANK_LINE_FOLLOWING_OPTION);
				}
			}

			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public shortcut_option(): Shortcut_optionContext {
		let _localctx: Shortcut_optionContext = new Shortcut_optionContext(this._ctx, this.state);
		this.enterRule(_localctx, 54, YarnSpinnerParser.RULE_shortcut_option);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 345;
			this.match(YarnSpinnerParser.SHORTCUT_ARROW);
			this.state = 346;
			this.line_statement();
			this.state = 355;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 35, this._ctx) ) {
			case 1:
				{
				this.state = 347;
				this.match(YarnSpinnerParser.INDENT);
				this.state = 351;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << YarnSpinnerParser.INDENT) | (1 << YarnSpinnerParser.SHORTCUT_ARROW) | (1 << YarnSpinnerParser.LINE_GROUP_ARROW) | (1 << YarnSpinnerParser.COMMAND_START) | (1 << YarnSpinnerParser.EXPRESSION_START) | (1 << YarnSpinnerParser.TEXT))) !== 0)) {
					{
					{
					this.state = 348;
					this.statement();
					}
					}
					this.state = 353;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 354;
				this.match(YarnSpinnerParser.DEDENT);
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public line_group_statement(): Line_group_statementContext {
		let _localctx: Line_group_statementContext = new Line_group_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 56, YarnSpinnerParser.RULE_line_group_statement);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 360;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 36, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 357;
					this.line_group_item();
					}
					}
				}
				this.state = 362;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 36, this._ctx);
			}
			{
			this.state = 363;
			this.line_group_item();
			this.state = 365;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === YarnSpinnerParser.BLANK_LINE_FOLLOWING_OPTION) {
				{
				this.state = 364;
				this.match(YarnSpinnerParser.BLANK_LINE_FOLLOWING_OPTION);
				}
			}

			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public line_group_item(): Line_group_itemContext {
		let _localctx: Line_group_itemContext = new Line_group_itemContext(this._ctx, this.state);
		this.enterRule(_localctx, 58, YarnSpinnerParser.RULE_line_group_item);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 367;
			this.match(YarnSpinnerParser.LINE_GROUP_ARROW);
			this.state = 368;
			this.line_statement();
			this.state = 377;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 39, this._ctx) ) {
			case 1:
				{
				this.state = 369;
				this.match(YarnSpinnerParser.INDENT);
				this.state = 373;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << YarnSpinnerParser.INDENT) | (1 << YarnSpinnerParser.SHORTCUT_ARROW) | (1 << YarnSpinnerParser.LINE_GROUP_ARROW) | (1 << YarnSpinnerParser.COMMAND_START) | (1 << YarnSpinnerParser.EXPRESSION_START) | (1 << YarnSpinnerParser.TEXT))) !== 0)) {
					{
					{
					this.state = 370;
					this.statement();
					}
					}
					this.state = 375;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 376;
				this.match(YarnSpinnerParser.DEDENT);
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public declare_statement(): Declare_statementContext {
		let _localctx: Declare_statementContext = new Declare_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 60, YarnSpinnerParser.RULE_declare_statement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 379;
			this.match(YarnSpinnerParser.COMMAND_START);
			this.state = 380;
			this.match(YarnSpinnerParser.COMMAND_DECLARE);
			this.state = 381;
			this.variable();
			this.state = 382;
			this.match(YarnSpinnerParser.OPERATOR_ASSIGNMENT);
			this.state = 383;
			this.expression(0);
			this.state = 386;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === YarnSpinnerParser.EXPRESSION_AS) {
				{
				this.state = 384;
				this.match(YarnSpinnerParser.EXPRESSION_AS);
				this.state = 385;
				_localctx._type = this.match(YarnSpinnerParser.FUNC_ID);
				}
			}

			this.state = 388;
			this.match(YarnSpinnerParser.COMMAND_END);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public enum_statement(): Enum_statementContext {
		let _localctx: Enum_statementContext = new Enum_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 62, YarnSpinnerParser.RULE_enum_statement);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 390;
			this.match(YarnSpinnerParser.COMMAND_START);
			this.state = 391;
			this.match(YarnSpinnerParser.COMMAND_ENUM);
			this.state = 392;
			_localctx._name = this.match(YarnSpinnerParser.ID);
			this.state = 393;
			this.match(YarnSpinnerParser.COMMAND_END);
			this.state = 395;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 394;
					this.enum_case_statement();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 397;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 41, this._ctx);
			} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
			this.state = 399;
			this.match(YarnSpinnerParser.COMMAND_START);
			this.state = 400;
			this.match(YarnSpinnerParser.COMMAND_ENDENUM);
			this.state = 401;
			this.match(YarnSpinnerParser.COMMAND_END);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public enum_case_statement(): Enum_case_statementContext {
		let _localctx: Enum_case_statementContext = new Enum_case_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 64, YarnSpinnerParser.RULE_enum_case_statement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 404;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === YarnSpinnerParser.INDENT) {
				{
				this.state = 403;
				this.match(YarnSpinnerParser.INDENT);
				}
			}

			this.state = 406;
			this.match(YarnSpinnerParser.COMMAND_START);
			this.state = 407;
			this.match(YarnSpinnerParser.COMMAND_CASE);
			this.state = 408;
			_localctx._name = this.match(YarnSpinnerParser.FUNC_ID);
			this.state = 411;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === YarnSpinnerParser.OPERATOR_ASSIGNMENT) {
				{
				this.state = 409;
				this.match(YarnSpinnerParser.OPERATOR_ASSIGNMENT);
				this.state = 410;
				_localctx._rawValue = this.value();
				}
			}

			this.state = 413;
			this.match(YarnSpinnerParser.COMMAND_END);
			this.state = 415;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === YarnSpinnerParser.DEDENT) {
				{
				this.state = 414;
				this.match(YarnSpinnerParser.DEDENT);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public jump_statement(): Jump_statementContext {
		let _localctx: Jump_statementContext = new Jump_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 66, YarnSpinnerParser.RULE_jump_statement);
		try {
			this.state = 439;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 45, this._ctx) ) {
			case 1:
				_localctx = new JumpToNodeNameContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 417;
				this.match(YarnSpinnerParser.COMMAND_START);
				this.state = 418;
				this.match(YarnSpinnerParser.COMMAND_JUMP);
				this.state = 419;
				(_localctx as JumpToNodeNameContext)._destination = this.match(YarnSpinnerParser.ID);
				this.state = 420;
				this.match(YarnSpinnerParser.COMMAND_END);
				}
				break;

			case 2:
				_localctx = new JumpToExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 421;
				this.match(YarnSpinnerParser.COMMAND_START);
				this.state = 422;
				this.match(YarnSpinnerParser.COMMAND_JUMP);
				this.state = 423;
				this.match(YarnSpinnerParser.EXPRESSION_START);
				this.state = 424;
				this.expression(0);
				this.state = 425;
				this.match(YarnSpinnerParser.EXPRESSION_END);
				this.state = 426;
				this.match(YarnSpinnerParser.COMMAND_END);
				}
				break;

			case 3:
				_localctx = new DetourToNodeNameContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 428;
				this.match(YarnSpinnerParser.COMMAND_START);
				this.state = 429;
				this.match(YarnSpinnerParser.COMMAND_DETOUR);
				this.state = 430;
				(_localctx as DetourToNodeNameContext)._destination = this.match(YarnSpinnerParser.ID);
				this.state = 431;
				this.match(YarnSpinnerParser.COMMAND_END);
				}
				break;

			case 4:
				_localctx = new DetourToExpressionContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 432;
				this.match(YarnSpinnerParser.COMMAND_START);
				this.state = 433;
				this.match(YarnSpinnerParser.COMMAND_DETOUR);
				this.state = 434;
				this.match(YarnSpinnerParser.EXPRESSION_START);
				this.state = 435;
				this.expression(0);
				this.state = 436;
				this.match(YarnSpinnerParser.EXPRESSION_END);
				this.state = 437;
				this.match(YarnSpinnerParser.COMMAND_END);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public return_statement(): Return_statementContext {
		let _localctx: Return_statementContext = new Return_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 68, YarnSpinnerParser.RULE_return_statement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 441;
			this.match(YarnSpinnerParser.COMMAND_START);
			this.state = 442;
			this.match(YarnSpinnerParser.COMMAND_RETURN);
			this.state = 443;
			this.match(YarnSpinnerParser.COMMAND_END);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public once_statement(): Once_statementContext {
		let _localctx: Once_statementContext = new Once_statementContext(this._ctx, this.state);
		this.enterRule(_localctx, 70, YarnSpinnerParser.RULE_once_statement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 445;
			this.once_primary_clause();
			this.state = 447;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 46, this._ctx) ) {
			case 1:
				{
				this.state = 446;
				this.once_alternate_clause();
				}
				break;
			}
			this.state = 449;
			this.match(YarnSpinnerParser.COMMAND_START);
			this.state = 450;
			this.match(YarnSpinnerParser.COMMAND_ENDONCE);
			this.state = 451;
			this.match(YarnSpinnerParser.COMMAND_END);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public once_primary_clause(): Once_primary_clauseContext {
		let _localctx: Once_primary_clauseContext = new Once_primary_clauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 72, YarnSpinnerParser.RULE_once_primary_clause);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 453;
			this.match(YarnSpinnerParser.COMMAND_START);
			this.state = 454;
			this.match(YarnSpinnerParser.COMMAND_ONCE);
			this.state = 457;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === YarnSpinnerParser.COMMAND_IF) {
				{
				this.state = 455;
				this.match(YarnSpinnerParser.COMMAND_IF);
				this.state = 456;
				this.expression(0);
				}
			}

			this.state = 459;
			this.match(YarnSpinnerParser.COMMAND_END);
			this.state = 463;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 48, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 460;
					this.statement();
					}
					}
				}
				this.state = 465;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 48, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public once_alternate_clause(): Once_alternate_clauseContext {
		let _localctx: Once_alternate_clauseContext = new Once_alternate_clauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 74, YarnSpinnerParser.RULE_once_alternate_clause);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 466;
			this.match(YarnSpinnerParser.COMMAND_START);
			this.state = 467;
			this.match(YarnSpinnerParser.COMMAND_ELSE);
			this.state = 468;
			this.match(YarnSpinnerParser.COMMAND_END);
			this.state = 472;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 49, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 469;
					this.statement();
					}
					}
				}
				this.state = 474;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 49, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public structured_command(): Structured_commandContext {
		let _localctx: Structured_commandContext = new Structured_commandContext(this._ctx, this.state);
		this.enterRule(_localctx, 76, YarnSpinnerParser.RULE_structured_command);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 475;
			_localctx._command_id = this.match(YarnSpinnerParser.FUNC_ID);
			this.state = 479;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & ((1 << (YarnSpinnerParser.KEYWORD_TRUE - 33)) | (1 << (YarnSpinnerParser.KEYWORD_FALSE - 33)) | (1 << (YarnSpinnerParser.NUMBER - 33)) | (1 << (YarnSpinnerParser.OPERATOR_LOGICAL_NOT - 33)) | (1 << (YarnSpinnerParser.OPERATOR_MATHS_SUBTRACTION - 33)) | (1 << (YarnSpinnerParser.LPAREN - 33)) | (1 << (YarnSpinnerParser.STRING - 33)) | (1 << (YarnSpinnerParser.FUNC_ID - 33)))) !== 0) || _la === YarnSpinnerParser.VAR_ID || _la === YarnSpinnerParser.DOT) {
				{
				{
				this.state = 476;
				this.structured_command_value();
				}
				}
				this.state = 481;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public structured_command_value(): Structured_command_valueContext {
		let _localctx: Structured_command_valueContext = new Structured_command_valueContext(this._ctx, this.state);
		this.enterRule(_localctx, 78, YarnSpinnerParser.RULE_structured_command_value);
		try {
			this.state = 484;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 51, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 482;
				this.expression(0);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 483;
				this.match(YarnSpinnerParser.FUNC_ID);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 13:
			return this.expression_sempred(_localctx as ExpressionContext, predIndex);
		}
		return true;
	}
	private expression_sempred(_localctx: ExpressionContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 6);

		case 1:
			return this.precpred(this._ctx, 5);

		case 2:
			return this.precpred(this._ctx, 4);

		case 3:
			return this.precpred(this._ctx, 3);

		case 4:
			return this.precpred(this._ctx, 2);
		}
		return true;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03`\u01E9\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04" +
		"\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04" +
		"\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04\"\t\"\x04#" +
		"\t#\x04$\t$\x04%\t%\x04&\t&\x04\'\t\'\x04(\t(\x04)\t)\x03\x02\x07\x02" +
		"T\n\x02\f\x02\x0E\x02W\v\x02\x03\x02\x06\x02Z\n\x02\r\x02\x0E\x02[\x03" +
		"\x03\x03\x03\x03\x03\x03\x04\x03\x04\x03\x04\x06\x04d\n\x04\r\x04\x0E" +
		"\x04e\x03\x04\x03\x04\x03\x04\x03\x04\x03\x05\x03\x05\x03\x05\x03\x05" +
		"\x03\x05\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x07\x03\x07\x03\x07" +
		"\x05\x07y\n\x07\x03\b\x03\b\x03\b\x03\b\x03\b\x05\b\x80\n\b\x05\b\x82" +
		"\n\b\x03\t\x07\t\x85\n\t\f\t\x0E\t\x88\v\t\x03\n\x03\n\x03\n\x03\n\x03" +
		"\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x07\n\x98\n\n" +
		"\f\n\x0E\n\x9B\v\n\x03\n\x05\n\x9E\n\n\x03\v\x03\v\x05\v\xA2\n\v\x03\v" +
		"\x07\v\xA5\n\v\f\v\x0E\v\xA8\v\v\x03\v\x03\v\x03\f\x06\f\xAD\n\f\r\f\x0E" +
		"\f\xAE\x03\f\x03\f\x03\f\x03\f\x06\f\xB5\n\f\r\f\x0E\f\xB6\x03\r\x03\r" +
		"\x03\r\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E" +
		"\x03\x0E\x05\x0E\xC5\n\x0E\x03\x0E\x05\x0E\xC8\n\x0E\x03\x0F\x03\x0F\x03" +
		"\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x05\x0F\xD4" +
		"\n\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F" +
		"\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x07\x0F\xE5\n" +
		"\x0F\f\x0F\x0E\x0F\xE8\v\x0F\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03" +
		"\x10\x03\x10\x05\x10\xF1\n\x10\x03\x11\x03\x11\x03\x12\x03\x12\x03\x12" +
		"\x05\x12\xF8\n\x12\x03\x12\x03\x12\x07\x12\xFC\n\x12\f\x12\x0E\x12\xFF" +
		"\v\x12\x03\x12\x03\x12\x03\x13\x05\x13\u0104\n\x13\x03\x13\x03\x13\x03" +
		"\x13\x03\x14\x03\x14\x07\x14\u010B\n\x14\f\x14\x0E\x14\u010E\v\x14\x03" +
		"\x14\x05\x14\u0111\n\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x15\x03\x15" +
		"\x03\x15\x03\x15\x03\x15\x07\x15\u011C\n\x15\f\x15\x0E\x15\u011F\v\x15" +
		"\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x07\x16\u0126\n\x16\f\x16\x0E" +
		"\x16\u0129\v\x16\x03\x17\x03\x17\x03\x17\x03\x17\x07\x17\u012F\n\x17\f" +
		"\x17\x0E\x17\u0132\v\x17\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18" +
		"\x03\x18\x03\x19\x03\x19\x03\x19\x03\x19\x03\x19\x03\x1A\x03\x1A\x03\x1A" +
		"\x03\x1A\x07\x1A\u0144\n\x1A\f\x1A\x0E\x1A\u0147\v\x1A\x03\x1B\x03\x1B" +
		"\x03\x1B\x03\x1B\x03\x1B\x06\x1B\u014E\n\x1B\r\x1B\x0E\x1B\u014F\x03\x1C" +
		"\x07\x1C\u0153\n\x1C\f\x1C\x0E\x1C\u0156\v\x1C\x03\x1C\x03\x1C\x05\x1C" +
		"\u015A\n\x1C\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x07\x1D\u0160\n\x1D\f\x1D" +
		"\x0E\x1D\u0163\v\x1D\x03\x1D\x05\x1D\u0166\n\x1D\x03\x1E\x07\x1E\u0169" +
		"\n\x1E\f\x1E\x0E\x1E\u016C\v\x1E\x03\x1E\x03\x1E\x05\x1E\u0170\n\x1E\x03" +
		"\x1F\x03\x1F\x03\x1F\x03\x1F\x07\x1F\u0176\n\x1F\f\x1F\x0E\x1F\u0179\v" +
		"\x1F\x03\x1F\x05\x1F\u017C\n\x1F\x03 \x03 \x03 \x03 \x03 \x03 \x03 \x05" +
		" \u0185\n \x03 \x03 \x03!\x03!\x03!\x03!\x03!\x06!\u018E\n!\r!\x0E!\u018F" +
		"\x03!\x03!\x03!\x03!\x03\"\x05\"\u0197\n\"\x03\"\x03\"\x03\"\x03\"\x03" +
		"\"\x05\"\u019E\n\"\x03\"\x03\"\x05\"\u01A2\n\"\x03#\x03#\x03#\x03#\x03" +
		"#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03" +
		"#\x03#\x03#\x03#\x05#\u01BA\n#\x03$\x03$\x03$\x03$\x03%\x03%\x05%\u01C2" +
		"\n%\x03%\x03%\x03%\x03%\x03&\x03&\x03&\x03&\x05&\u01CC\n&\x03&\x03&\x07" +
		"&\u01D0\n&\f&\x0E&\u01D3\v&\x03\'\x03\'\x03\'\x03\'\x07\'\u01D9\n\'\f" +
		"\'\x0E\'\u01DC\v\'\x03(\x03(\x07(\u01E0\n(\f(\x0E(\u01E3\v(\x03)\x03)" +
		"\x05)\u01E7\n)\x03)\x02\x02\x03\x1C*\x02\x02\x04\x02\x06\x02\b\x02\n\x02" +
		"\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02" +
		"\x1E\x02 \x02\"\x02$\x02&\x02(\x02*\x02,\x02.\x020\x022\x024\x026\x02" +
		"8\x02:\x02<\x02>\x02@\x02B\x02D\x02F\x02H\x02J\x02L\x02N\x02P\x02\x02" +
		"\b\x03\x029;\x03\x0278\x04\x02()+,\x04\x02**--\x03\x02.0\x04\x02\'\'2" +
		"6\x02\u020D\x02U\x03\x02\x02\x02\x04]\x03\x02\x02\x02\x06c\x03\x02\x02" +
		"\x02\bk\x03\x02\x02\x02\np\x03\x02\x02\x02\fu\x03\x02\x02\x02\x0E\x81" +
		"\x03\x02\x02\x02\x10\x86\x03\x02\x02\x02\x12\x9D\x03\x02\x02\x02\x14\x9F" +
		"\x03\x02\x02\x02\x16\xB4\x03\x02\x02\x02\x18\xB8\x03\x02\x02\x02\x1A\xC7" +
		"\x03\x02\x02\x02\x1C\xD3\x03\x02\x02\x02\x1E\xF0\x03\x02\x02\x02 \xF2" +
		"\x03\x02\x02\x02\"\xF4\x03\x02\x02\x02$\u0103\x03\x02\x02\x02&\u0108\x03" +
		"\x02\x02\x02(\u0116\x03\x02\x02\x02*\u0120\x03\x02\x02\x02,\u012A\x03" +
		"\x02\x02\x02.\u0133\x03\x02\x02\x020\u013A\x03\x02\x02\x022\u013F\x03" +
		"\x02\x02\x024\u014D\x03\x02\x02\x026\u0154\x03\x02\x02\x028\u015B\x03" +
		"\x02\x02\x02:\u016A\x03\x02\x02\x02<\u0171\x03\x02\x02\x02>\u017D\x03" +
		"\x02\x02\x02@\u0188\x03\x02\x02\x02B\u0196\x03\x02\x02\x02D\u01B9\x03" +
		"\x02\x02\x02F\u01BB\x03\x02\x02\x02H\u01BF\x03\x02\x02\x02J\u01C7\x03" +
		"\x02\x02\x02L\u01D4\x03\x02\x02\x02N\u01DD\x03\x02\x02\x02P\u01E6\x03" +
		"\x02\x02\x02RT\x05\x04\x03\x02SR\x03\x02\x02\x02TW\x03\x02\x02\x02US\x03" +
		"\x02\x02\x02UV\x03\x02\x02\x02VY\x03\x02\x02\x02WU\x03\x02\x02\x02XZ\x05" +
		"\x06\x04\x02YX\x03\x02\x02\x02Z[\x03\x02\x02\x02[Y\x03\x02\x02\x02[\\" +
		"\x03\x02\x02\x02\\\x03\x03\x02\x02\x02]^\x07\x0E\x02\x02^_\x07 \x02\x02" +
		"_\x05\x03\x02\x02\x02`d\x05\f\x07\x02ad\x05\n\x06\x02bd\x05\b\x05\x02" +
		"c`\x03\x02\x02\x02ca\x03\x02\x02\x02cb\x03\x02\x02\x02de\x03\x02\x02\x02" +
		"ec\x03\x02\x02\x02ef\x03\x02\x02\x02fg\x03\x02\x02\x02gh\x07\f\x02\x02" +
		"hi\x05\x10\t\x02ij\x07\x12\x02\x02j\x07\x03\x02\x02\x02kl\x07\n\x02\x02" +
		"lm\x07\r\x02\x02mn\x07\v\x02\x02no\x07\b\x02\x02o\t\x03\x02\x02\x02pq" +
		"\x07\t\x02\x02qr\x07\r\x02\x02rs\x05\x0E\b\x02st\x07\b\x02\x02t\v\x03" +
		"\x02\x02\x02uv\x07\v\x02\x02vx\x07\r\x02\x02wy\x07\x10\x02\x02xw\x03\x02" +
		"\x02\x02xy\x03\x02\x02\x02y\r\x03\x02\x02\x02z\x82\x05\x1C\x0F\x02{\x82" +
		"\x07\"\x02\x02|\x7F\x07T\x02\x02}~\x07G\x02\x02~\x80\x05\x1C\x0F\x02\x7F" +
		"}\x03\x02\x02\x02\x7F\x80\x03\x02\x02\x02\x80\x82\x03\x02\x02\x02\x81" +
		"z\x03\x02\x02\x02\x81{\x03\x02\x02\x02\x81|\x03\x02\x02\x02\x82\x0F\x03" +
		"\x02\x02\x02\x83\x85\x05\x12\n\x02\x84\x83\x03\x02\x02\x02\x85\x88\x03" +
		"\x02\x02\x02\x86\x84\x03\x02\x02\x02\x86\x87\x03\x02\x02\x02\x87\x11\x03" +
		"\x02\x02\x02\x88\x86\x03\x02\x02\x02\x89\x9E\x05\x14\v\x02\x8A\x9E\x05" +
		"&\x14\x02\x8B\x9E\x05.\x18\x02\x8C\x9E\x056\x1C\x02\x8D\x9E\x050\x19\x02" +
		"\x8E\x9E\x052\x1A\x02\x8F\x9E\x05> \x02\x90\x9E\x05@!\x02\x91\x9E\x05" +
		"D#\x02\x92\x9E\x05F$\x02\x93\x9E\x05:\x1E\x02\x94\x9E\x05H%\x02\x95\x99" +
		"\x07\x03\x02\x02\x96\x98\x05\x12\n\x02\x97\x96\x03\x02\x02\x02\x98\x9B" +
		"\x03\x02\x02\x02\x99\x97\x03\x02\x02\x02\x99\x9A\x03\x02\x02\x02\x9A\x9C" +
		"\x03\x02\x02\x02\x9B\x99\x03\x02\x02\x02\x9C\x9E\x07\x04\x02\x02\x9D\x89" +
		"\x03\x02\x02\x02\x9D\x8A\x03\x02\x02\x02\x9D\x8B\x03\x02\x02\x02\x9D\x8C" +
		"\x03\x02\x02\x02\x9D\x8D\x03\x02\x02\x02\x9D\x8E\x03\x02\x02\x02\x9D\x8F" +
		"\x03\x02\x02\x02\x9D\x90\x03\x02\x02\x02\x9D\x91\x03\x02\x02\x02\x9D\x92" +
		"\x03\x02\x02\x02\x9D\x93\x03\x02\x02\x02\x9D\x94\x03\x02\x02\x02\x9D\x95" +
		"\x03\x02\x02\x02\x9E\x13\x03\x02\x02\x02\x9F\xA1\x05\x16\f\x02\xA0\xA2" +
		"\x05\x1A\x0E\x02\xA1\xA0\x03\x02\x02\x02\xA1\xA2\x03\x02\x02\x02\xA2\xA6" +
		"\x03\x02\x02\x02\xA3\xA5\x05\x18\r\x02\xA4\xA3\x03\x02\x02\x02\xA5\xA8" +
		"\x03\x02\x02\x02\xA6\xA4\x03\x02\x02\x02\xA6\xA7\x03\x02\x02\x02\xA7\xA9" +
		"\x03\x02\x02\x02\xA8\xA6\x03\x02\x02\x02\xA9\xAA\x07\b\x02\x02\xAA\x15" +
		"\x03\x02\x02\x02\xAB\xAD\x07\x1A\x02\x02\xAC\xAB\x03\x02\x02\x02\xAD\xAE" +
		"\x03\x02\x02\x02\xAE\xAC\x03\x02\x02\x02\xAE\xAF\x03\x02\x02\x02\xAF\xB5" +
		"\x03\x02\x02\x02\xB0\xB1\x07\x16\x02\x02\xB1\xB2\x05\x1C\x0F\x02\xB2\xB3" +
		"\x07B\x02\x02\xB3\xB5\x03\x02\x02\x02\xB4\xAC\x03\x02\x02\x02\xB4\xB0" +
		"\x03\x02\x02\x02\xB5\xB6\x03\x02\x02\x02\xB6\xB4\x03\x02\x02\x02\xB6\xB7" +
		"\x03\x02\x02\x02\xB7\x17\x03\x02\x02\x02\xB8\xB9\x07\x0E\x02\x02\xB9\xBA" +
		"\x07 \x02\x02\xBA\x19\x03\x02\x02\x02\xBB\xBC\x07\x15\x02\x02\xBC\xBD" +
		"\x07G\x02\x02\xBD\xBE\x05\x1C\x0F\x02\xBE\xBF\x07W\x02\x02\xBF\xC8\x03" +
		"\x02\x02\x02\xC0\xC1\x07\x15\x02\x02\xC1\xC4\x07T\x02\x02\xC2\xC3\x07" +
		"G\x02\x02\xC3\xC5\x05\x1C\x0F\x02\xC4\xC2\x03\x02\x02\x02\xC4\xC5\x03" +
		"\x02\x02\x02\xC5\xC6\x03\x02\x02\x02\xC6\xC8\x07W\x02\x02\xC7\xBB\x03" +
		"\x02\x02\x02\xC7\xC0\x03\x02\x02\x02\xC8\x1B\x03\x02\x02\x02\xC9\xCA\b" +
		"\x0F\x01\x02\xCA\xCB\x07<\x02\x02\xCB\xCC\x05\x1C\x0F\x02\xCC\xCD\x07" +
		"=\x02\x02\xCD\xD4\x03\x02\x02\x02\xCE\xCF\x078\x02\x02\xCF\xD4\x05\x1C" +
		"\x0F\n\xD0\xD1\x071\x02\x02\xD1\xD4\x05\x1C\x0F\t\xD2\xD4\x05\x1E\x10" +
		"\x02\xD3\xC9\x03\x02\x02\x02\xD3\xCE\x03\x02\x02\x02\xD3\xD0\x03\x02\x02" +
		"\x02\xD3\xD2\x03\x02\x02\x02\xD4\xE6\x03\x02\x02\x02\xD5\xD6\f\b\x02\x02" +
		"\xD6\xD7\t\x02\x02\x02\xD7\xE5\x05\x1C\x0F\t\xD8\xD9\f\x07\x02\x02\xD9" +
		"\xDA\t\x03\x02\x02\xDA\xE5\x05\x1C\x0F\b\xDB\xDC\f\x06\x02\x02\xDC\xDD" +
		"\t\x04\x02\x02\xDD\xE5\x05\x1C\x0F\x07\xDE\xDF\f\x05\x02\x02\xDF\xE0\t" +
		"\x05\x02\x02\xE0\xE5\x05\x1C\x0F\x06\xE1\xE2\f\x04\x02\x02\xE2\xE3\t\x06" +
		"\x02\x02\xE3\xE5\x05\x1C\x0F\x05\xE4\xD5\x03\x02\x02\x02\xE4\xD8\x03\x02" +
		"\x02\x02\xE4\xDB\x03\x02\x02\x02\xE4\xDE\x03\x02\x02\x02\xE4\xE1\x03\x02" +
		"\x02\x02\xE5\xE8\x03\x02\x02\x02\xE6\xE4\x03\x02\x02\x02\xE6\xE7\x03\x02" +
		"\x02\x02\xE7\x1D\x03\x02\x02\x02\xE8\xE6\x03\x02\x02\x02\xE9\xF1\x07&" +
		"\x02\x02\xEA\xF1\x07#\x02\x02\xEB\xF1\x07$\x02\x02\xEC\xF1\x05 \x11\x02" +
		"\xED\xF1\x07@\x02\x02\xEE\xF1\x05\"\x12\x02\xEF\xF1\x05$\x13\x02\xF0\xE9" +
		"\x03\x02\x02\x02\xF0\xEA\x03\x02\x02\x02\xF0\xEB\x03\x02\x02\x02\xF0\xEC" +
		"\x03\x02\x02\x02\xF0\xED\x03\x02\x02\x02\xF0\xEE\x03\x02\x02\x02\xF0\xEF" +
		"\x03\x02\x02\x02\xF1\x1F\x03\x02\x02\x02\xF2\xF3\x07C\x02\x02\xF3!\x03" +
		"\x02\x02\x02\xF4\xF5\x07A\x02\x02\xF5\xF7\x07<\x02\x02\xF6\xF8\x05\x1C" +
		"\x0F\x02\xF7\xF6\x03\x02\x02\x02\xF7\xF8\x03\x02\x02\x02\xF8\xFD\x03\x02" +
		"\x02\x02\xF9\xFA\x07>\x02\x02\xFA\xFC\x05\x1C\x0F\x02\xFB\xF9\x03\x02" +
		"\x02\x02\xFC\xFF\x03\x02\x02\x02\xFD\xFB\x03\x02\x02\x02\xFD\xFE\x03\x02" +
		"\x02\x02\xFE\u0100\x03\x02\x02\x02\xFF\xFD\x03\x02\x02\x02\u0100\u0101" +
		"\x07=\x02\x02\u0101#\x03\x02\x02\x02\u0102\u0104\x07A\x02\x02\u0103\u0102" +
		"\x03\x02\x02\x02\u0103\u0104\x03\x02\x02\x02\u0104\u0105\x03\x02\x02\x02" +
		"\u0105\u0106\x07D\x02\x02\u0106\u0107\x07A\x02\x02\u0107%\x03\x02\x02" +
		"\x02\u0108\u010C\x05(\x15\x02\u0109\u010B\x05*\x16\x02\u010A\u0109\x03" +
		"\x02\x02\x02\u010B\u010E\x03\x02\x02\x02\u010C\u010A\x03\x02\x02\x02\u010C" +
		"\u010D\x03\x02\x02\x02\u010D\u0110\x03\x02\x02\x02\u010E\u010C\x03\x02" +
		"\x02\x02\u010F\u0111\x05,\x17\x02\u0110\u010F\x03\x02\x02\x02\u0110\u0111" +
		"\x03\x02\x02\x02\u0111\u0112\x03\x02\x02\x02\u0112\u0113\x07\x15\x02\x02" +
		"\u0113\u0114\x07K\x02\x02\u0114\u0115\x07W\x02\x02\u0115\'\x03\x02\x02" +
		"\x02\u0116\u0117\x07\x15\x02\x02\u0117\u0118\x07G\x02\x02\u0118\u0119" +
		"\x05\x1C\x0F\x02\u0119\u011D\x07W\x02\x02\u011A\u011C\x05\x12\n\x02\u011B" +
		"\u011A\x03\x02\x02\x02\u011C\u011F\x03\x02\x02\x02\u011D\u011B\x03\x02" +
		"\x02\x02\u011D\u011E\x03\x02\x02\x02\u011E)\x03\x02\x02\x02\u011F\u011D" +
		"\x03\x02\x02\x02\u0120\u0121\x07\x15\x02\x02\u0121\u0122\x07H\x02\x02" +
		"\u0122\u0123\x05\x1C\x0F\x02\u0123\u0127\x07W\x02\x02\u0124\u0126\x05" +
		"\x12\n\x02\u0125\u0124\x03\x02\x02\x02\u0126\u0129\x03\x02\x02\x02\u0127" +
		"\u0125\x03\x02\x02\x02\u0127\u0128\x03\x02\x02\x02\u0128+\x03\x02\x02" +
		"\x02\u0129\u0127\x03\x02\x02\x02\u012A\u012B\x07\x15\x02\x02\u012B\u012C" +
		"\x07I\x02\x02\u012C\u0130\x07W\x02\x02\u012D\u012F\x05\x12\n\x02\u012E" +
		"\u012D\x03\x02\x02\x02\u012F\u0132\x03\x02\x02\x02\u0130\u012E\x03\x02" +
		"\x02\x02\u0130\u0131\x03\x02\x02\x02\u0131-\x03\x02\x02\x02\u0132\u0130" +
		"\x03\x02\x02\x02\u0133\u0134\x07\x15\x02\x02\u0134\u0135\x07J\x02\x02" +
		"\u0135\u0136\x05 \x11\x02\u0136\u0137\t\x07\x02\x02\u0137\u0138\x05\x1C" +
		"\x0F\x02\u0138\u0139\x07W\x02\x02\u0139/\x03\x02\x02\x02\u013A\u013B\x07" +
		"\x15\x02\x02\u013B\u013C\x07L\x02\x02\u013C\u013D\x05\"\x12\x02\u013D" +
		"\u013E\x07W\x02\x02\u013E1\x03\x02\x02\x02\u013F\u0140\x07\x15\x02\x02" +
		"\u0140\u0141\x054\x1B\x02\u0141\u0145\x07W\x02\x02\u0142\u0144\x05\x18" +
		"\r\x02\u0143\u0142\x03\x02\x02\x02\u0144\u0147\x03\x02\x02\x02\u0145\u0143" +
		"\x03\x02\x02\x02\u0145\u0146\x03\x02\x02\x02\u01463\x03\x02\x02\x02\u0147" +
		"\u0145\x03\x02\x02\x02\u0148\u014E\x07Y\x02\x02\u0149\u014A\x07\x16\x02" +
		"\x02\u014A\u014B\x05\x1C\x0F\x02\u014B\u014C\x07B\x02\x02\u014C\u014E" +
		"\x03\x02\x02\x02\u014D\u0148\x03\x02\x02\x02\u014D\u0149\x03\x02\x02\x02" +
		"\u014E\u014F\x03\x02\x02\x02\u014F\u014D\x03\x02\x02\x02\u014F\u0150\x03" +
		"\x02\x02\x02\u01505\x03\x02\x02\x02\u0151\u0153\x058\x1D\x02\u0152\u0151" +
		"\x03\x02\x02\x02\u0153\u0156\x03\x02\x02\x02\u0154\u0152\x03\x02\x02\x02" +
		"\u0154\u0155\x03\x02\x02\x02\u0155\u0157\x03\x02\x02\x02\u0156\u0154\x03" +
		"\x02\x02\x02\u0157\u0159\x058\x1D\x02\u0158\u015A\x07\x05\x02\x02\u0159" +
		"\u0158\x03\x02\x02\x02\u0159\u015A\x03\x02\x02\x02\u015A7\x03\x02\x02" +
		"\x02\u015B\u015C\x07\x13\x02\x02\u015C\u0165\x05\x14\v\x02\u015D\u0161" +
		"\x07\x03\x02\x02\u015E\u0160\x05\x12\n\x02\u015F\u015E\x03\x02\x02\x02" +
		"\u0160\u0163\x03\x02\x02\x02\u0161\u015F\x03\x02\x02\x02\u0161\u0162\x03" +
		"\x02\x02\x02\u0162\u0164\x03\x02\x02\x02\u0163\u0161\x03\x02\x02\x02\u0164" +
		"\u0166\x07\x04\x02\x02\u0165\u015D\x03\x02\x02\x02\u0165\u0166\x03\x02" +
		"\x02\x02\u01669\x03\x02\x02\x02\u0167\u0169\x05<\x1F\x02\u0168\u0167\x03" +
		"\x02\x02\x02\u0169\u016C\x03\x02\x02\x02\u016A\u0168\x03\x02\x02\x02\u016A" +
		"\u016B\x03\x02\x02\x02\u016B\u016D\x03\x02\x02\x02\u016C\u016A\x03\x02" +
		"\x02\x02\u016D\u016F\x05<\x1F\x02\u016E\u0170\x07\x05\x02\x02\u016F\u016E" +
		"\x03\x02\x02\x02\u016F\u0170\x03\x02\x02\x02\u0170;\x03\x02\x02\x02\u0171" +
		"\u0172\x07\x14\x02\x02\u0172\u017B\x05\x14\v\x02\u0173\u0177\x07\x03\x02" +
		"\x02\u0174\u0176\x05\x12\n\x02\u0175\u0174\x03\x02\x02\x02\u0176\u0179" +
		"\x03\x02\x02\x02\u0177\u0175\x03\x02\x02\x02\u0177\u0178\x03\x02\x02\x02" +
		"\u0178\u017A\x03\x02\x02\x02\u0179\u0177\x03\x02\x02\x02\u017A\u017C\x07" +
		"\x04\x02\x02\u017B\u0173\x03\x02\x02\x02\u017B\u017C\x03\x02\x02\x02\u017C" +
		"=\x03\x02\x02\x02\u017D\u017E\x07\x15\x02\x02\u017E\u017F\x07M\x02\x02" +
		"\u017F\u0180\x05 \x11\x02\u0180\u0181\x07\'\x02\x02\u0181\u0184\x05\x1C" +
		"\x0F\x02\u0182\u0183\x07?\x02\x02\u0183\u0185\x07A\x02\x02\u0184\u0182" +
		"\x03\x02\x02\x02\u0184\u0185\x03\x02\x02\x02\u0185\u0186\x03\x02\x02\x02" +
		"\u0186\u0187\x07W\x02\x02\u0187?\x03\x02\x02\x02\u0188\u0189\x07\x15\x02" +
		"\x02\u0189\u018A\x07Q\x02\x02\u018A\u018B\x07\v\x02\x02\u018B\u018D\x07" +
		"W\x02\x02\u018C\u018E\x05B\"\x02\u018D\u018C\x03\x02\x02\x02\u018E\u018F" +
		"\x03\x02\x02\x02\u018F\u018D\x03\x02\x02\x02\u018F\u0190\x03\x02\x02\x02" +
		"\u0190\u0191\x03\x02\x02\x02\u0191\u0192\x07\x15\x02\x02\u0192\u0193\x07" +
		"S\x02\x02\u0193\u0194\x07W\x02\x02\u0194A\x03\x02\x02\x02\u0195\u0197" +
		"\x07\x03\x02\x02\u0196\u0195\x03\x02\x02\x02\u0196\u0197\x03\x02\x02\x02" +
		"\u0197\u0198\x03\x02\x02\x02\u0198\u0199\x07\x15\x02\x02\u0199\u019A\x07" +
		"R\x02\x02\u019A\u019D\x07A\x02\x02\u019B\u019C\x07\'\x02\x02\u019C\u019E" +
		"\x05\x1E\x10\x02\u019D\u019B\x03\x02\x02\x02\u019D\u019E\x03\x02\x02\x02" +
		"\u019E\u019F\x03\x02\x02\x02\u019F\u01A1\x07W\x02\x02\u01A0\u01A2\x07" +
		"\x04\x02\x02\u01A1\u01A0\x03\x02\x02\x02\u01A1\u01A2\x03\x02\x02\x02\u01A2" +
		"C\x03\x02\x02\x02\u01A3\u01A4\x07\x15\x02\x02\u01A4\u01A5\x07N\x02\x02" +
		"\u01A5\u01A6\x07\v\x02\x02\u01A6\u01BA\x07W\x02\x02\u01A7\u01A8\x07\x15" +
		"\x02\x02\u01A8\u01A9\x07N\x02\x02\u01A9\u01AA\x07\x16\x02\x02\u01AA\u01AB" +
		"\x05\x1C\x0F\x02\u01AB\u01AC\x07B\x02\x02\u01AC\u01AD\x07W\x02\x02\u01AD" +
		"\u01BA\x03\x02\x02\x02\u01AE\u01AF\x07\x15\x02\x02\u01AF\u01B0\x07O\x02" +
		"\x02\u01B0\u01B1\x07\v\x02\x02\u01B1\u01BA\x07W\x02\x02\u01B2\u01B3\x07" +
		"\x15\x02\x02\u01B3\u01B4\x07O\x02\x02\u01B4\u01B5\x07\x16\x02\x02\u01B5" +
		"\u01B6\x05\x1C\x0F\x02\u01B6\u01B7\x07B\x02\x02\u01B7\u01B8\x07W\x02\x02" +
		"\u01B8\u01BA\x03\x02\x02\x02\u01B9\u01A3\x03\x02\x02\x02\u01B9\u01A7\x03" +
		"\x02\x02\x02\u01B9\u01AE\x03\x02\x02\x02\u01B9\u01B2\x03\x02\x02\x02\u01BA" +
		"E\x03\x02\x02\x02\u01BB\u01BC\x07\x15\x02\x02\u01BC\u01BD\x07P\x02\x02" +
		"\u01BD\u01BE\x07W\x02\x02\u01BEG\x03\x02\x02\x02\u01BF\u01C1\x05J&\x02" +
		"\u01C0\u01C2\x05L\'\x02\u01C1\u01C0\x03\x02\x02\x02\u01C1\u01C2\x03\x02" +
		"\x02\x02\u01C2\u01C3\x03\x02\x02\x02\u01C3\u01C4\x07\x15\x02\x02\u01C4" +
		"\u01C5\x07U\x02\x02\u01C5\u01C6\x07W\x02\x02\u01C6I\x03\x02\x02\x02\u01C7" +
		"\u01C8\x07\x15\x02\x02\u01C8\u01CB\x07T\x02\x02\u01C9\u01CA\x07G\x02\x02" +
		"\u01CA\u01CC\x05\x1C\x0F\x02\u01CB\u01C9\x03\x02\x02\x02\u01CB\u01CC\x03" +
		"\x02\x02\x02\u01CC\u01CD\x03\x02\x02\x02\u01CD\u01D1\x07W\x02\x02\u01CE" +
		"\u01D0\x05\x12\n\x02\u01CF\u01CE\x03\x02\x02\x02\u01D0\u01D3\x03\x02\x02" +
		"\x02\u01D1\u01CF\x03\x02\x02\x02\u01D1\u01D2\x03\x02\x02\x02\u01D2K\x03" +
		"\x02\x02\x02\u01D3\u01D1\x03\x02\x02\x02\u01D4\u01D5\x07\x15\x02\x02\u01D5" +
		"\u01D6\x07I\x02\x02\u01D6\u01DA\x07W\x02\x02\u01D7\u01D9\x05\x12\n\x02" +
		"\u01D8\u01D7\x03\x02\x02\x02\u01D9\u01DC\x03\x02\x02\x02\u01DA\u01D8\x03" +
		"\x02\x02\x02\u01DA\u01DB\x03\x02\x02\x02\u01DBM\x03\x02\x02\x02\u01DC" +
		"\u01DA\x03\x02\x02\x02\u01DD\u01E1\x07A\x02\x02\u01DE\u01E0\x05P)\x02" +
		"\u01DF\u01DE\x03\x02\x02\x02\u01E0\u01E3\x03\x02\x02\x02\u01E1\u01DF\x03" +
		"\x02\x02\x02\u01E1\u01E2\x03\x02\x02\x02\u01E2O\x03\x02\x02\x02\u01E3" +
		"\u01E1\x03\x02\x02\x02\u01E4\u01E7\x05\x1C\x0F\x02\u01E5\u01E7\x07A\x02" +
		"\x02\u01E6\u01E4\x03\x02\x02\x02\u01E6\u01E5\x03\x02\x02\x02\u01E7Q\x03" +
		"\x02\x02\x026U[cex\x7F\x81\x86\x99\x9D\xA1\xA6\xAE\xB4\xB6\xC4\xC7\xD3" +
		"\xE4\xE6\xF0\xF7\xFD\u0103\u010C\u0110\u011D\u0127\u0130\u0145\u014D\u014F" +
		"\u0154\u0159\u0161\u0165\u016A\u016F\u0177\u017B\u0184\u018F\u0196\u019D" +
		"\u01A1\u01B9\u01C1\u01CB\u01D1\u01DA\u01E1\u01E6";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!YarnSpinnerParser.__ATN) {
			YarnSpinnerParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(YarnSpinnerParser._serializedATN));
		}

		return YarnSpinnerParser.__ATN;
	}

}

export class DialogueContext extends ParserRuleContext {
	public node(): NodeContext[];
	public node(i: number): NodeContext;
	public node(i?: number): NodeContext | NodeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(NodeContext);
		} else {
			return this.getRuleContext(i, NodeContext);
		}
	}
	public file_hashtag(): File_hashtagContext[];
	public file_hashtag(i: number): File_hashtagContext;
	public file_hashtag(i?: number): File_hashtagContext | File_hashtagContext[] {
		if (i === undefined) {
			return this.getRuleContexts(File_hashtagContext);
		} else {
			return this.getRuleContext(i, File_hashtagContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return YarnSpinnerParser.RULE_dialogue; }
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterDialogue) {
			listener.enterDialogue(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitDialogue) {
			listener.exitDialogue(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitDialogue) {
			return visitor.visitDialogue(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class File_hashtagContext extends ParserRuleContext {
	public _text!: Token;
	public HASHTAG(): TerminalNode { return this.getToken(YarnSpinnerParser.HASHTAG, 0); }
	public HASHTAG_TEXT(): TerminalNode { return this.getToken(YarnSpinnerParser.HASHTAG_TEXT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return YarnSpinnerParser.RULE_file_hashtag; }
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterFile_hashtag) {
			listener.enterFile_hashtag(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitFile_hashtag) {
			listener.exitFile_hashtag(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitFile_hashtag) {
			return visitor.visitFile_hashtag(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NodeContext extends ParserRuleContext {
	public BODY_START(): TerminalNode { return this.getToken(YarnSpinnerParser.BODY_START, 0); }
	public body(): BodyContext {
		return this.getRuleContext(0, BodyContext);
	}
	public BODY_END(): TerminalNode { return this.getToken(YarnSpinnerParser.BODY_END, 0); }
	public header(): HeaderContext[];
	public header(i: number): HeaderContext;
	public header(i?: number): HeaderContext | HeaderContext[] {
		if (i === undefined) {
			return this.getRuleContexts(HeaderContext);
		} else {
			return this.getRuleContext(i, HeaderContext);
		}
	}
	public when_header(): When_headerContext[];
	public when_header(i: number): When_headerContext;
	public when_header(i?: number): When_headerContext | When_headerContext[] {
		if (i === undefined) {
			return this.getRuleContexts(When_headerContext);
		} else {
			return this.getRuleContext(i, When_headerContext);
		}
	}
	public title_header(): Title_headerContext[];
	public title_header(i: number): Title_headerContext;
	public title_header(i?: number): Title_headerContext | Title_headerContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Title_headerContext);
		} else {
			return this.getRuleContext(i, Title_headerContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return YarnSpinnerParser.RULE_node; }
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterNode) {
			listener.enterNode(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitNode) {
			listener.exitNode(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitNode) {
			return visitor.visitNode(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Title_headerContext extends ParserRuleContext {
	public _title!: Token;
	public HEADER_TITLE(): TerminalNode { return this.getToken(YarnSpinnerParser.HEADER_TITLE, 0); }
	public HEADER_DELIMITER(): TerminalNode { return this.getToken(YarnSpinnerParser.HEADER_DELIMITER, 0); }
	public NEWLINE(): TerminalNode { return this.getToken(YarnSpinnerParser.NEWLINE, 0); }
	public ID(): TerminalNode { return this.getToken(YarnSpinnerParser.ID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return YarnSpinnerParser.RULE_title_header; }
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterTitle_header) {
			listener.enterTitle_header(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitTitle_header) {
			listener.exitTitle_header(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitTitle_header) {
			return visitor.visitTitle_header(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class When_headerContext extends ParserRuleContext {
	public _header_expression!: Header_when_expressionContext;
	public HEADER_WHEN(): TerminalNode { return this.getToken(YarnSpinnerParser.HEADER_WHEN, 0); }
	public HEADER_DELIMITER(): TerminalNode { return this.getToken(YarnSpinnerParser.HEADER_DELIMITER, 0); }
	public NEWLINE(): TerminalNode { return this.getToken(YarnSpinnerParser.NEWLINE, 0); }
	public header_when_expression(): Header_when_expressionContext {
		return this.getRuleContext(0, Header_when_expressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return YarnSpinnerParser.RULE_when_header; }
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterWhen_header) {
			listener.enterWhen_header(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitWhen_header) {
			listener.exitWhen_header(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitWhen_header) {
			return visitor.visitWhen_header(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class HeaderContext extends ParserRuleContext {
	public _header_key!: Token;
	public _header_value!: Token;
	public HEADER_DELIMITER(): TerminalNode { return this.getToken(YarnSpinnerParser.HEADER_DELIMITER, 0); }
	public ID(): TerminalNode { return this.getToken(YarnSpinnerParser.ID, 0); }
	public HEADER_TEXT(): TerminalNode | undefined { return this.tryGetToken(YarnSpinnerParser.HEADER_TEXT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return YarnSpinnerParser.RULE_header; }
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterHeader) {
			listener.enterHeader(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitHeader) {
			listener.exitHeader(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitHeader) {
			return visitor.visitHeader(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Header_when_expressionContext extends ParserRuleContext {
	public _always!: Token;
	public _once!: Token;
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	public EXPRESSION_WHEN_ALWAYS(): TerminalNode | undefined { return this.tryGetToken(YarnSpinnerParser.EXPRESSION_WHEN_ALWAYS, 0); }
	public COMMAND_ONCE(): TerminalNode | undefined { return this.tryGetToken(YarnSpinnerParser.COMMAND_ONCE, 0); }
	public COMMAND_IF(): TerminalNode | undefined { return this.tryGetToken(YarnSpinnerParser.COMMAND_IF, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return YarnSpinnerParser.RULE_header_when_expression; }
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterHeader_when_expression) {
			listener.enterHeader_when_expression(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitHeader_when_expression) {
			listener.exitHeader_when_expression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitHeader_when_expression) {
			return visitor.visitHeader_when_expression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BodyContext extends ParserRuleContext {
	public statement(): StatementContext[];
	public statement(i: number): StatementContext;
	public statement(i?: number): StatementContext | StatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatementContext);
		} else {
			return this.getRuleContext(i, StatementContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return YarnSpinnerParser.RULE_body; }
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterBody) {
			listener.enterBody(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitBody) {
			listener.exitBody(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitBody) {
			return visitor.visitBody(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StatementContext extends ParserRuleContext {
	public line_statement(): Line_statementContext | undefined {
		return this.tryGetRuleContext(0, Line_statementContext);
	}
	public if_statement(): If_statementContext | undefined {
		return this.tryGetRuleContext(0, If_statementContext);
	}
	public set_statement(): Set_statementContext | undefined {
		return this.tryGetRuleContext(0, Set_statementContext);
	}
	public shortcut_option_statement(): Shortcut_option_statementContext | undefined {
		return this.tryGetRuleContext(0, Shortcut_option_statementContext);
	}
	public call_statement(): Call_statementContext | undefined {
		return this.tryGetRuleContext(0, Call_statementContext);
	}
	public command_statement(): Command_statementContext | undefined {
		return this.tryGetRuleContext(0, Command_statementContext);
	}
	public declare_statement(): Declare_statementContext | undefined {
		return this.tryGetRuleContext(0, Declare_statementContext);
	}
	public enum_statement(): Enum_statementContext | undefined {
		return this.tryGetRuleContext(0, Enum_statementContext);
	}
	public jump_statement(): Jump_statementContext | undefined {
		return this.tryGetRuleContext(0, Jump_statementContext);
	}
	public return_statement(): Return_statementContext | undefined {
		return this.tryGetRuleContext(0, Return_statementContext);
	}
	public line_group_statement(): Line_group_statementContext | undefined {
		return this.tryGetRuleContext(0, Line_group_statementContext);
	}
	public once_statement(): Once_statementContext | undefined {
		return this.tryGetRuleContext(0, Once_statementContext);
	}
	public INDENT(): TerminalNode | undefined { return this.tryGetToken(YarnSpinnerParser.INDENT, 0); }
	public DEDENT(): TerminalNode | undefined { return this.tryGetToken(YarnSpinnerParser.DEDENT, 0); }
	public statement(): StatementContext[];
	public statement(i: number): StatementContext;
	public statement(i?: number): StatementContext | StatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatementContext);
		} else {
			return this.getRuleContext(i, StatementContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return YarnSpinnerParser.RULE_statement; }
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterStatement) {
			listener.enterStatement(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitStatement) {
			listener.exitStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitStatement) {
			return visitor.visitStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Line_statementContext extends ParserRuleContext {
	public line_formatted_text(): Line_formatted_textContext {
		return this.getRuleContext(0, Line_formatted_textContext);
	}
	public NEWLINE(): TerminalNode { return this.getToken(YarnSpinnerParser.NEWLINE, 0); }
	public line_condition(): Line_conditionContext | undefined {
		return this.tryGetRuleContext(0, Line_conditionContext);
	}
	public hashtag(): HashtagContext[];
	public hashtag(i: number): HashtagContext;
	public hashtag(i?: number): HashtagContext | HashtagContext[] {
		if (i === undefined) {
			return this.getRuleContexts(HashtagContext);
		} else {
			return this.getRuleContext(i, HashtagContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return YarnSpinnerParser.RULE_line_statement; }
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterLine_statement) {
			listener.enterLine_statement(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitLine_statement) {
			listener.exitLine_statement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitLine_statement) {
			return visitor.visitLine_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Line_formatted_textContext extends ParserRuleContext {
	public EXPRESSION_START(): TerminalNode[];
	public EXPRESSION_START(i: number): TerminalNode;
	public EXPRESSION_START(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(YarnSpinnerParser.EXPRESSION_START);
		} else {
			return this.getToken(YarnSpinnerParser.EXPRESSION_START, i);
		}
	}
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public EXPRESSION_END(): TerminalNode[];
	public EXPRESSION_END(i: number): TerminalNode;
	public EXPRESSION_END(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(YarnSpinnerParser.EXPRESSION_END);
		} else {
			return this.getToken(YarnSpinnerParser.EXPRESSION_END, i);
		}
	}
	public TEXT(): TerminalNode[];
	public TEXT(i: number): TerminalNode;
	public TEXT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(YarnSpinnerParser.TEXT);
		} else {
			return this.getToken(YarnSpinnerParser.TEXT, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return YarnSpinnerParser.RULE_line_formatted_text; }
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterLine_formatted_text) {
			listener.enterLine_formatted_text(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitLine_formatted_text) {
			listener.exitLine_formatted_text(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitLine_formatted_text) {
			return visitor.visitLine_formatted_text(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class HashtagContext extends ParserRuleContext {
	public _text!: Token;
	public HASHTAG(): TerminalNode { return this.getToken(YarnSpinnerParser.HASHTAG, 0); }
	public HASHTAG_TEXT(): TerminalNode { return this.getToken(YarnSpinnerParser.HASHTAG_TEXT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return YarnSpinnerParser.RULE_hashtag; }
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterHashtag) {
			listener.enterHashtag(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitHashtag) {
			listener.exitHashtag(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitHashtag) {
			return visitor.visitHashtag(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Line_conditionContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return YarnSpinnerParser.RULE_line_condition; }
	public copyFrom(ctx: Line_conditionContext): void {
		super.copyFrom(ctx);
	}
}
export class LineConditionContext extends Line_conditionContext {
	public COMMAND_START(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_START, 0); }
	public COMMAND_IF(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_IF, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public COMMAND_END(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_END, 0); }
	constructor(ctx: Line_conditionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterLineCondition) {
			listener.enterLineCondition(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitLineCondition) {
			listener.exitLineCondition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitLineCondition) {
			return visitor.visitLineCondition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LineOnceConditionContext extends Line_conditionContext {
	public COMMAND_START(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_START, 0); }
	public COMMAND_ONCE(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_ONCE, 0); }
	public COMMAND_END(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_END, 0); }
	public COMMAND_IF(): TerminalNode | undefined { return this.tryGetToken(YarnSpinnerParser.COMMAND_IF, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	constructor(ctx: Line_conditionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterLineOnceCondition) {
			listener.enterLineOnceCondition(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitLineOnceCondition) {
			listener.exitLineOnceCondition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitLineOnceCondition) {
			return visitor.visitLineOnceCondition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return YarnSpinnerParser.RULE_expression; }
	public copyFrom(ctx: ExpressionContext): void {
		super.copyFrom(ctx);
	}
}
export class ExpParensContext extends ExpressionContext {
	public LPAREN(): TerminalNode { return this.getToken(YarnSpinnerParser.LPAREN, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(YarnSpinnerParser.RPAREN, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterExpParens) {
			listener.enterExpParens(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitExpParens) {
			listener.exitExpParens(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitExpParens) {
			return visitor.visitExpParens(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ExpNegativeContext extends ExpressionContext {
	public _op!: Token;
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public OPERATOR_MATHS_SUBTRACTION(): TerminalNode { return this.getToken(YarnSpinnerParser.OPERATOR_MATHS_SUBTRACTION, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterExpNegative) {
			listener.enterExpNegative(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitExpNegative) {
			listener.exitExpNegative(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitExpNegative) {
			return visitor.visitExpNegative(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ExpNotContext extends ExpressionContext {
	public _op!: Token;
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public OPERATOR_LOGICAL_NOT(): TerminalNode { return this.getToken(YarnSpinnerParser.OPERATOR_LOGICAL_NOT, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterExpNot) {
			listener.enterExpNot(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitExpNot) {
			listener.exitExpNot(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitExpNot) {
			return visitor.visitExpNot(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ExpMultDivModContext extends ExpressionContext {
	public _op!: Token;
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public OPERATOR_MATHS_MULTIPLICATION(): TerminalNode | undefined { return this.tryGetToken(YarnSpinnerParser.OPERATOR_MATHS_MULTIPLICATION, 0); }
	public OPERATOR_MATHS_DIVISION(): TerminalNode | undefined { return this.tryGetToken(YarnSpinnerParser.OPERATOR_MATHS_DIVISION, 0); }
	public OPERATOR_MATHS_MODULUS(): TerminalNode | undefined { return this.tryGetToken(YarnSpinnerParser.OPERATOR_MATHS_MODULUS, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterExpMultDivMod) {
			listener.enterExpMultDivMod(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitExpMultDivMod) {
			listener.exitExpMultDivMod(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitExpMultDivMod) {
			return visitor.visitExpMultDivMod(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ExpAddSubContext extends ExpressionContext {
	public _op!: Token;
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public OPERATOR_MATHS_ADDITION(): TerminalNode | undefined { return this.tryGetToken(YarnSpinnerParser.OPERATOR_MATHS_ADDITION, 0); }
	public OPERATOR_MATHS_SUBTRACTION(): TerminalNode | undefined { return this.tryGetToken(YarnSpinnerParser.OPERATOR_MATHS_SUBTRACTION, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterExpAddSub) {
			listener.enterExpAddSub(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitExpAddSub) {
			listener.exitExpAddSub(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitExpAddSub) {
			return visitor.visitExpAddSub(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ExpComparisonContext extends ExpressionContext {
	public _op!: Token;
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public OPERATOR_LOGICAL_LESS_THAN_EQUALS(): TerminalNode | undefined { return this.tryGetToken(YarnSpinnerParser.OPERATOR_LOGICAL_LESS_THAN_EQUALS, 0); }
	public OPERATOR_LOGICAL_GREATER_THAN_EQUALS(): TerminalNode | undefined { return this.tryGetToken(YarnSpinnerParser.OPERATOR_LOGICAL_GREATER_THAN_EQUALS, 0); }
	public OPERATOR_LOGICAL_LESS(): TerminalNode | undefined { return this.tryGetToken(YarnSpinnerParser.OPERATOR_LOGICAL_LESS, 0); }
	public OPERATOR_LOGICAL_GREATER(): TerminalNode | undefined { return this.tryGetToken(YarnSpinnerParser.OPERATOR_LOGICAL_GREATER, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterExpComparison) {
			listener.enterExpComparison(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitExpComparison) {
			listener.exitExpComparison(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitExpComparison) {
			return visitor.visitExpComparison(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ExpEqualityContext extends ExpressionContext {
	public _op!: Token;
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public OPERATOR_LOGICAL_EQUALS(): TerminalNode | undefined { return this.tryGetToken(YarnSpinnerParser.OPERATOR_LOGICAL_EQUALS, 0); }
	public OPERATOR_LOGICAL_NOT_EQUALS(): TerminalNode | undefined { return this.tryGetToken(YarnSpinnerParser.OPERATOR_LOGICAL_NOT_EQUALS, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterExpEquality) {
			listener.enterExpEquality(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitExpEquality) {
			listener.exitExpEquality(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitExpEquality) {
			return visitor.visitExpEquality(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ExpAndOrXorContext extends ExpressionContext {
	public _op!: Token;
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public OPERATOR_LOGICAL_AND(): TerminalNode | undefined { return this.tryGetToken(YarnSpinnerParser.OPERATOR_LOGICAL_AND, 0); }
	public OPERATOR_LOGICAL_OR(): TerminalNode | undefined { return this.tryGetToken(YarnSpinnerParser.OPERATOR_LOGICAL_OR, 0); }
	public OPERATOR_LOGICAL_XOR(): TerminalNode | undefined { return this.tryGetToken(YarnSpinnerParser.OPERATOR_LOGICAL_XOR, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterExpAndOrXor) {
			listener.enterExpAndOrXor(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitExpAndOrXor) {
			listener.exitExpAndOrXor(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitExpAndOrXor) {
			return visitor.visitExpAndOrXor(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ExpValueContext extends ExpressionContext {
	public value(): ValueContext {
		return this.getRuleContext(0, ValueContext);
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterExpValue) {
			listener.enterExpValue(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitExpValue) {
			listener.exitExpValue(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitExpValue) {
			return visitor.visitExpValue(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ValueContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return YarnSpinnerParser.RULE_value; }
	public copyFrom(ctx: ValueContext): void {
		super.copyFrom(ctx);
	}
}
export class ValueNumberContext extends ValueContext {
	public NUMBER(): TerminalNode { return this.getToken(YarnSpinnerParser.NUMBER, 0); }
	constructor(ctx: ValueContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterValueNumber) {
			listener.enterValueNumber(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitValueNumber) {
			listener.exitValueNumber(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitValueNumber) {
			return visitor.visitValueNumber(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ValueTrueContext extends ValueContext {
	public KEYWORD_TRUE(): TerminalNode { return this.getToken(YarnSpinnerParser.KEYWORD_TRUE, 0); }
	constructor(ctx: ValueContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterValueTrue) {
			listener.enterValueTrue(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitValueTrue) {
			listener.exitValueTrue(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitValueTrue) {
			return visitor.visitValueTrue(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ValueFalseContext extends ValueContext {
	public KEYWORD_FALSE(): TerminalNode { return this.getToken(YarnSpinnerParser.KEYWORD_FALSE, 0); }
	constructor(ctx: ValueContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterValueFalse) {
			listener.enterValueFalse(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitValueFalse) {
			listener.exitValueFalse(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitValueFalse) {
			return visitor.visitValueFalse(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ValueVarContext extends ValueContext {
	public variable(): VariableContext {
		return this.getRuleContext(0, VariableContext);
	}
	constructor(ctx: ValueContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterValueVar) {
			listener.enterValueVar(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitValueVar) {
			listener.exitValueVar(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitValueVar) {
			return visitor.visitValueVar(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ValueStringContext extends ValueContext {
	public STRING(): TerminalNode { return this.getToken(YarnSpinnerParser.STRING, 0); }
	constructor(ctx: ValueContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterValueString) {
			listener.enterValueString(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitValueString) {
			listener.exitValueString(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitValueString) {
			return visitor.visitValueString(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ValueFuncContext extends ValueContext {
	public function_call(): Function_callContext {
		return this.getRuleContext(0, Function_callContext);
	}
	constructor(ctx: ValueContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterValueFunc) {
			listener.enterValueFunc(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitValueFunc) {
			listener.exitValueFunc(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitValueFunc) {
			return visitor.visitValueFunc(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ValueTypeMemberReferenceContext extends ValueContext {
	public typeMemberReference(): TypeMemberReferenceContext {
		return this.getRuleContext(0, TypeMemberReferenceContext);
	}
	constructor(ctx: ValueContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterValueTypeMemberReference) {
			listener.enterValueTypeMemberReference(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitValueTypeMemberReference) {
			listener.exitValueTypeMemberReference(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitValueTypeMemberReference) {
			return visitor.visitValueTypeMemberReference(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VariableContext extends ParserRuleContext {
	public VAR_ID(): TerminalNode { return this.getToken(YarnSpinnerParser.VAR_ID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return YarnSpinnerParser.RULE_variable; }
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterVariable) {
			listener.enterVariable(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitVariable) {
			listener.exitVariable(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitVariable) {
			return visitor.visitVariable(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Function_callContext extends ParserRuleContext {
	public FUNC_ID(): TerminalNode { return this.getToken(YarnSpinnerParser.FUNC_ID, 0); }
	public LPAREN(): TerminalNode { return this.getToken(YarnSpinnerParser.LPAREN, 0); }
	public RPAREN(): TerminalNode { return this.getToken(YarnSpinnerParser.RPAREN, 0); }
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(YarnSpinnerParser.COMMA);
		} else {
			return this.getToken(YarnSpinnerParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return YarnSpinnerParser.RULE_function_call; }
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterFunction_call) {
			listener.enterFunction_call(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitFunction_call) {
			listener.exitFunction_call(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitFunction_call) {
			return visitor.visitFunction_call(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeMemberReferenceContext extends ParserRuleContext {
	public _typeName!: Token;
	public _memberName!: Token;
	public DOT(): TerminalNode { return this.getToken(YarnSpinnerParser.DOT, 0); }
	public FUNC_ID(): TerminalNode[];
	public FUNC_ID(i: number): TerminalNode;
	public FUNC_ID(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(YarnSpinnerParser.FUNC_ID);
		} else {
			return this.getToken(YarnSpinnerParser.FUNC_ID, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return YarnSpinnerParser.RULE_typeMemberReference; }
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterTypeMemberReference) {
			listener.enterTypeMemberReference(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitTypeMemberReference) {
			listener.exitTypeMemberReference(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitTypeMemberReference) {
			return visitor.visitTypeMemberReference(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class If_statementContext extends ParserRuleContext {
	public if_clause(): If_clauseContext {
		return this.getRuleContext(0, If_clauseContext);
	}
	public COMMAND_START(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_START, 0); }
	public COMMAND_ENDIF(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_ENDIF, 0); }
	public COMMAND_END(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_END, 0); }
	public else_if_clause(): Else_if_clauseContext[];
	public else_if_clause(i: number): Else_if_clauseContext;
	public else_if_clause(i?: number): Else_if_clauseContext | Else_if_clauseContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Else_if_clauseContext);
		} else {
			return this.getRuleContext(i, Else_if_clauseContext);
		}
	}
	public else_clause(): Else_clauseContext | undefined {
		return this.tryGetRuleContext(0, Else_clauseContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return YarnSpinnerParser.RULE_if_statement; }
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterIf_statement) {
			listener.enterIf_statement(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitIf_statement) {
			listener.exitIf_statement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitIf_statement) {
			return visitor.visitIf_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class If_clauseContext extends ParserRuleContext {
	public COMMAND_START(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_START, 0); }
	public COMMAND_IF(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_IF, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public COMMAND_END(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_END, 0); }
	public statement(): StatementContext[];
	public statement(i: number): StatementContext;
	public statement(i?: number): StatementContext | StatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatementContext);
		} else {
			return this.getRuleContext(i, StatementContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return YarnSpinnerParser.RULE_if_clause; }
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterIf_clause) {
			listener.enterIf_clause(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitIf_clause) {
			listener.exitIf_clause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitIf_clause) {
			return visitor.visitIf_clause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Else_if_clauseContext extends ParserRuleContext {
	public COMMAND_START(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_START, 0); }
	public COMMAND_ELSEIF(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_ELSEIF, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public COMMAND_END(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_END, 0); }
	public statement(): StatementContext[];
	public statement(i: number): StatementContext;
	public statement(i?: number): StatementContext | StatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatementContext);
		} else {
			return this.getRuleContext(i, StatementContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return YarnSpinnerParser.RULE_else_if_clause; }
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterElse_if_clause) {
			listener.enterElse_if_clause(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitElse_if_clause) {
			listener.exitElse_if_clause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitElse_if_clause) {
			return visitor.visitElse_if_clause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Else_clauseContext extends ParserRuleContext {
	public COMMAND_START(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_START, 0); }
	public COMMAND_ELSE(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_ELSE, 0); }
	public COMMAND_END(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_END, 0); }
	public statement(): StatementContext[];
	public statement(i: number): StatementContext;
	public statement(i?: number): StatementContext | StatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatementContext);
		} else {
			return this.getRuleContext(i, StatementContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return YarnSpinnerParser.RULE_else_clause; }
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterElse_clause) {
			listener.enterElse_clause(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitElse_clause) {
			listener.exitElse_clause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitElse_clause) {
			return visitor.visitElse_clause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Set_statementContext extends ParserRuleContext {
	public _op!: Token;
	public COMMAND_START(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_START, 0); }
	public COMMAND_SET(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_SET, 0); }
	public variable(): VariableContext {
		return this.getRuleContext(0, VariableContext);
	}
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public COMMAND_END(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_END, 0); }
	public OPERATOR_ASSIGNMENT(): TerminalNode | undefined { return this.tryGetToken(YarnSpinnerParser.OPERATOR_ASSIGNMENT, 0); }
	public OPERATOR_MATHS_MULTIPLICATION_EQUALS(): TerminalNode | undefined { return this.tryGetToken(YarnSpinnerParser.OPERATOR_MATHS_MULTIPLICATION_EQUALS, 0); }
	public OPERATOR_MATHS_DIVISION_EQUALS(): TerminalNode | undefined { return this.tryGetToken(YarnSpinnerParser.OPERATOR_MATHS_DIVISION_EQUALS, 0); }
	public OPERATOR_MATHS_MODULUS_EQUALS(): TerminalNode | undefined { return this.tryGetToken(YarnSpinnerParser.OPERATOR_MATHS_MODULUS_EQUALS, 0); }
	public OPERATOR_MATHS_ADDITION_EQUALS(): TerminalNode | undefined { return this.tryGetToken(YarnSpinnerParser.OPERATOR_MATHS_ADDITION_EQUALS, 0); }
	public OPERATOR_MATHS_SUBTRACTION_EQUALS(): TerminalNode | undefined { return this.tryGetToken(YarnSpinnerParser.OPERATOR_MATHS_SUBTRACTION_EQUALS, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return YarnSpinnerParser.RULE_set_statement; }
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterSet_statement) {
			listener.enterSet_statement(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitSet_statement) {
			listener.exitSet_statement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitSet_statement) {
			return visitor.visitSet_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Call_statementContext extends ParserRuleContext {
	public COMMAND_START(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_START, 0); }
	public COMMAND_CALL(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_CALL, 0); }
	public function_call(): Function_callContext {
		return this.getRuleContext(0, Function_callContext);
	}
	public COMMAND_END(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_END, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return YarnSpinnerParser.RULE_call_statement; }
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterCall_statement) {
			listener.enterCall_statement(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitCall_statement) {
			listener.exitCall_statement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitCall_statement) {
			return visitor.visitCall_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Command_statementContext extends ParserRuleContext {
	public COMMAND_START(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_START, 0); }
	public command_formatted_text(): Command_formatted_textContext {
		return this.getRuleContext(0, Command_formatted_textContext);
	}
	public COMMAND_END(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_END, 0); }
	public hashtag(): HashtagContext[];
	public hashtag(i: number): HashtagContext;
	public hashtag(i?: number): HashtagContext | HashtagContext[] {
		if (i === undefined) {
			return this.getRuleContexts(HashtagContext);
		} else {
			return this.getRuleContext(i, HashtagContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return YarnSpinnerParser.RULE_command_statement; }
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterCommand_statement) {
			listener.enterCommand_statement(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitCommand_statement) {
			listener.exitCommand_statement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitCommand_statement) {
			return visitor.visitCommand_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Command_formatted_textContext extends ParserRuleContext {
	public COMMAND_TEXT(): TerminalNode[];
	public COMMAND_TEXT(i: number): TerminalNode;
	public COMMAND_TEXT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(YarnSpinnerParser.COMMAND_TEXT);
		} else {
			return this.getToken(YarnSpinnerParser.COMMAND_TEXT, i);
		}
	}
	public EXPRESSION_START(): TerminalNode[];
	public EXPRESSION_START(i: number): TerminalNode;
	public EXPRESSION_START(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(YarnSpinnerParser.EXPRESSION_START);
		} else {
			return this.getToken(YarnSpinnerParser.EXPRESSION_START, i);
		}
	}
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public EXPRESSION_END(): TerminalNode[];
	public EXPRESSION_END(i: number): TerminalNode;
	public EXPRESSION_END(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(YarnSpinnerParser.EXPRESSION_END);
		} else {
			return this.getToken(YarnSpinnerParser.EXPRESSION_END, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return YarnSpinnerParser.RULE_command_formatted_text; }
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterCommand_formatted_text) {
			listener.enterCommand_formatted_text(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitCommand_formatted_text) {
			listener.exitCommand_formatted_text(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitCommand_formatted_text) {
			return visitor.visitCommand_formatted_text(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Shortcut_option_statementContext extends ParserRuleContext {
	public shortcut_option(): Shortcut_optionContext[];
	public shortcut_option(i: number): Shortcut_optionContext;
	public shortcut_option(i?: number): Shortcut_optionContext | Shortcut_optionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Shortcut_optionContext);
		} else {
			return this.getRuleContext(i, Shortcut_optionContext);
		}
	}
	public BLANK_LINE_FOLLOWING_OPTION(): TerminalNode | undefined { return this.tryGetToken(YarnSpinnerParser.BLANK_LINE_FOLLOWING_OPTION, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return YarnSpinnerParser.RULE_shortcut_option_statement; }
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterShortcut_option_statement) {
			listener.enterShortcut_option_statement(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitShortcut_option_statement) {
			listener.exitShortcut_option_statement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitShortcut_option_statement) {
			return visitor.visitShortcut_option_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Shortcut_optionContext extends ParserRuleContext {
	public SHORTCUT_ARROW(): TerminalNode { return this.getToken(YarnSpinnerParser.SHORTCUT_ARROW, 0); }
	public line_statement(): Line_statementContext {
		return this.getRuleContext(0, Line_statementContext);
	}
	public INDENT(): TerminalNode | undefined { return this.tryGetToken(YarnSpinnerParser.INDENT, 0); }
	public DEDENT(): TerminalNode | undefined { return this.tryGetToken(YarnSpinnerParser.DEDENT, 0); }
	public statement(): StatementContext[];
	public statement(i: number): StatementContext;
	public statement(i?: number): StatementContext | StatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatementContext);
		} else {
			return this.getRuleContext(i, StatementContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return YarnSpinnerParser.RULE_shortcut_option; }
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterShortcut_option) {
			listener.enterShortcut_option(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitShortcut_option) {
			listener.exitShortcut_option(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitShortcut_option) {
			return visitor.visitShortcut_option(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Line_group_statementContext extends ParserRuleContext {
	public line_group_item(): Line_group_itemContext[];
	public line_group_item(i: number): Line_group_itemContext;
	public line_group_item(i?: number): Line_group_itemContext | Line_group_itemContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Line_group_itemContext);
		} else {
			return this.getRuleContext(i, Line_group_itemContext);
		}
	}
	public BLANK_LINE_FOLLOWING_OPTION(): TerminalNode | undefined { return this.tryGetToken(YarnSpinnerParser.BLANK_LINE_FOLLOWING_OPTION, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return YarnSpinnerParser.RULE_line_group_statement; }
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterLine_group_statement) {
			listener.enterLine_group_statement(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitLine_group_statement) {
			listener.exitLine_group_statement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitLine_group_statement) {
			return visitor.visitLine_group_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Line_group_itemContext extends ParserRuleContext {
	public LINE_GROUP_ARROW(): TerminalNode { return this.getToken(YarnSpinnerParser.LINE_GROUP_ARROW, 0); }
	public line_statement(): Line_statementContext {
		return this.getRuleContext(0, Line_statementContext);
	}
	public INDENT(): TerminalNode | undefined { return this.tryGetToken(YarnSpinnerParser.INDENT, 0); }
	public DEDENT(): TerminalNode | undefined { return this.tryGetToken(YarnSpinnerParser.DEDENT, 0); }
	public statement(): StatementContext[];
	public statement(i: number): StatementContext;
	public statement(i?: number): StatementContext | StatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatementContext);
		} else {
			return this.getRuleContext(i, StatementContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return YarnSpinnerParser.RULE_line_group_item; }
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterLine_group_item) {
			listener.enterLine_group_item(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitLine_group_item) {
			listener.exitLine_group_item(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitLine_group_item) {
			return visitor.visitLine_group_item(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Declare_statementContext extends ParserRuleContext {
	public _type!: Token;
	public COMMAND_START(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_START, 0); }
	public COMMAND_DECLARE(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_DECLARE, 0); }
	public variable(): VariableContext {
		return this.getRuleContext(0, VariableContext);
	}
	public OPERATOR_ASSIGNMENT(): TerminalNode { return this.getToken(YarnSpinnerParser.OPERATOR_ASSIGNMENT, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public COMMAND_END(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_END, 0); }
	public EXPRESSION_AS(): TerminalNode | undefined { return this.tryGetToken(YarnSpinnerParser.EXPRESSION_AS, 0); }
	public FUNC_ID(): TerminalNode | undefined { return this.tryGetToken(YarnSpinnerParser.FUNC_ID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return YarnSpinnerParser.RULE_declare_statement; }
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterDeclare_statement) {
			listener.enterDeclare_statement(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitDeclare_statement) {
			listener.exitDeclare_statement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitDeclare_statement) {
			return visitor.visitDeclare_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Enum_statementContext extends ParserRuleContext {
	public _name!: Token;
	public COMMAND_START(): TerminalNode[];
	public COMMAND_START(i: number): TerminalNode;
	public COMMAND_START(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(YarnSpinnerParser.COMMAND_START);
		} else {
			return this.getToken(YarnSpinnerParser.COMMAND_START, i);
		}
	}
	public COMMAND_ENUM(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_ENUM, 0); }
	public COMMAND_END(): TerminalNode[];
	public COMMAND_END(i: number): TerminalNode;
	public COMMAND_END(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(YarnSpinnerParser.COMMAND_END);
		} else {
			return this.getToken(YarnSpinnerParser.COMMAND_END, i);
		}
	}
	public COMMAND_ENDENUM(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_ENDENUM, 0); }
	public ID(): TerminalNode { return this.getToken(YarnSpinnerParser.ID, 0); }
	public enum_case_statement(): Enum_case_statementContext[];
	public enum_case_statement(i: number): Enum_case_statementContext;
	public enum_case_statement(i?: number): Enum_case_statementContext | Enum_case_statementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Enum_case_statementContext);
		} else {
			return this.getRuleContext(i, Enum_case_statementContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return YarnSpinnerParser.RULE_enum_statement; }
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterEnum_statement) {
			listener.enterEnum_statement(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitEnum_statement) {
			listener.exitEnum_statement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitEnum_statement) {
			return visitor.visitEnum_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Enum_case_statementContext extends ParserRuleContext {
	public _name!: Token;
	public _rawValue!: ValueContext;
	public COMMAND_START(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_START, 0); }
	public COMMAND_CASE(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_CASE, 0); }
	public COMMAND_END(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_END, 0); }
	public FUNC_ID(): TerminalNode { return this.getToken(YarnSpinnerParser.FUNC_ID, 0); }
	public INDENT(): TerminalNode | undefined { return this.tryGetToken(YarnSpinnerParser.INDENT, 0); }
	public OPERATOR_ASSIGNMENT(): TerminalNode | undefined { return this.tryGetToken(YarnSpinnerParser.OPERATOR_ASSIGNMENT, 0); }
	public DEDENT(): TerminalNode | undefined { return this.tryGetToken(YarnSpinnerParser.DEDENT, 0); }
	public value(): ValueContext | undefined {
		return this.tryGetRuleContext(0, ValueContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return YarnSpinnerParser.RULE_enum_case_statement; }
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterEnum_case_statement) {
			listener.enterEnum_case_statement(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitEnum_case_statement) {
			listener.exitEnum_case_statement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitEnum_case_statement) {
			return visitor.visitEnum_case_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Jump_statementContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return YarnSpinnerParser.RULE_jump_statement; }
	public copyFrom(ctx: Jump_statementContext): void {
		super.copyFrom(ctx);
	}
}
export class JumpToNodeNameContext extends Jump_statementContext {
	public _destination!: Token;
	public COMMAND_START(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_START, 0); }
	public COMMAND_JUMP(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_JUMP, 0); }
	public COMMAND_END(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_END, 0); }
	public ID(): TerminalNode { return this.getToken(YarnSpinnerParser.ID, 0); }
	constructor(ctx: Jump_statementContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterJumpToNodeName) {
			listener.enterJumpToNodeName(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitJumpToNodeName) {
			listener.exitJumpToNodeName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitJumpToNodeName) {
			return visitor.visitJumpToNodeName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class JumpToExpressionContext extends Jump_statementContext {
	public COMMAND_START(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_START, 0); }
	public COMMAND_JUMP(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_JUMP, 0); }
	public EXPRESSION_START(): TerminalNode { return this.getToken(YarnSpinnerParser.EXPRESSION_START, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public EXPRESSION_END(): TerminalNode { return this.getToken(YarnSpinnerParser.EXPRESSION_END, 0); }
	public COMMAND_END(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_END, 0); }
	constructor(ctx: Jump_statementContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterJumpToExpression) {
			listener.enterJumpToExpression(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitJumpToExpression) {
			listener.exitJumpToExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitJumpToExpression) {
			return visitor.visitJumpToExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DetourToNodeNameContext extends Jump_statementContext {
	public _destination!: Token;
	public COMMAND_START(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_START, 0); }
	public COMMAND_DETOUR(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_DETOUR, 0); }
	public COMMAND_END(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_END, 0); }
	public ID(): TerminalNode { return this.getToken(YarnSpinnerParser.ID, 0); }
	constructor(ctx: Jump_statementContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterDetourToNodeName) {
			listener.enterDetourToNodeName(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitDetourToNodeName) {
			listener.exitDetourToNodeName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitDetourToNodeName) {
			return visitor.visitDetourToNodeName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DetourToExpressionContext extends Jump_statementContext {
	public COMMAND_START(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_START, 0); }
	public COMMAND_DETOUR(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_DETOUR, 0); }
	public EXPRESSION_START(): TerminalNode { return this.getToken(YarnSpinnerParser.EXPRESSION_START, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public EXPRESSION_END(): TerminalNode { return this.getToken(YarnSpinnerParser.EXPRESSION_END, 0); }
	public COMMAND_END(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_END, 0); }
	constructor(ctx: Jump_statementContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterDetourToExpression) {
			listener.enterDetourToExpression(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitDetourToExpression) {
			listener.exitDetourToExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitDetourToExpression) {
			return visitor.visitDetourToExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Return_statementContext extends ParserRuleContext {
	public COMMAND_START(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_START, 0); }
	public COMMAND_RETURN(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_RETURN, 0); }
	public COMMAND_END(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_END, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return YarnSpinnerParser.RULE_return_statement; }
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterReturn_statement) {
			listener.enterReturn_statement(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitReturn_statement) {
			listener.exitReturn_statement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitReturn_statement) {
			return visitor.visitReturn_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Once_statementContext extends ParserRuleContext {
	public once_primary_clause(): Once_primary_clauseContext {
		return this.getRuleContext(0, Once_primary_clauseContext);
	}
	public COMMAND_START(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_START, 0); }
	public COMMAND_ENDONCE(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_ENDONCE, 0); }
	public COMMAND_END(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_END, 0); }
	public once_alternate_clause(): Once_alternate_clauseContext | undefined {
		return this.tryGetRuleContext(0, Once_alternate_clauseContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return YarnSpinnerParser.RULE_once_statement; }
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterOnce_statement) {
			listener.enterOnce_statement(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitOnce_statement) {
			listener.exitOnce_statement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitOnce_statement) {
			return visitor.visitOnce_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Once_primary_clauseContext extends ParserRuleContext {
	public COMMAND_START(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_START, 0); }
	public COMMAND_ONCE(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_ONCE, 0); }
	public COMMAND_END(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_END, 0); }
	public COMMAND_IF(): TerminalNode | undefined { return this.tryGetToken(YarnSpinnerParser.COMMAND_IF, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	public statement(): StatementContext[];
	public statement(i: number): StatementContext;
	public statement(i?: number): StatementContext | StatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatementContext);
		} else {
			return this.getRuleContext(i, StatementContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return YarnSpinnerParser.RULE_once_primary_clause; }
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterOnce_primary_clause) {
			listener.enterOnce_primary_clause(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitOnce_primary_clause) {
			listener.exitOnce_primary_clause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitOnce_primary_clause) {
			return visitor.visitOnce_primary_clause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Once_alternate_clauseContext extends ParserRuleContext {
	public COMMAND_START(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_START, 0); }
	public COMMAND_ELSE(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_ELSE, 0); }
	public COMMAND_END(): TerminalNode { return this.getToken(YarnSpinnerParser.COMMAND_END, 0); }
	public statement(): StatementContext[];
	public statement(i: number): StatementContext;
	public statement(i?: number): StatementContext | StatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatementContext);
		} else {
			return this.getRuleContext(i, StatementContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return YarnSpinnerParser.RULE_once_alternate_clause; }
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterOnce_alternate_clause) {
			listener.enterOnce_alternate_clause(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitOnce_alternate_clause) {
			listener.exitOnce_alternate_clause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitOnce_alternate_clause) {
			return visitor.visitOnce_alternate_clause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Structured_commandContext extends ParserRuleContext {
	public _command_id!: Token;
	public FUNC_ID(): TerminalNode { return this.getToken(YarnSpinnerParser.FUNC_ID, 0); }
	public structured_command_value(): Structured_command_valueContext[];
	public structured_command_value(i: number): Structured_command_valueContext;
	public structured_command_value(i?: number): Structured_command_valueContext | Structured_command_valueContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Structured_command_valueContext);
		} else {
			return this.getRuleContext(i, Structured_command_valueContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return YarnSpinnerParser.RULE_structured_command; }
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterStructured_command) {
			listener.enterStructured_command(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitStructured_command) {
			listener.exitStructured_command(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitStructured_command) {
			return visitor.visitStructured_command(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Structured_command_valueContext extends ParserRuleContext {
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	public FUNC_ID(): TerminalNode | undefined { return this.tryGetToken(YarnSpinnerParser.FUNC_ID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return YarnSpinnerParser.RULE_structured_command_value; }
	// @Override
	public enterRule(listener: YarnSpinnerParserListener): void {
		if (listener.enterStructured_command_value) {
			listener.enterStructured_command_value(this);
		}
	}
	// @Override
	public exitRule(listener: YarnSpinnerParserListener): void {
		if (listener.exitStructured_command_value) {
			listener.exitStructured_command_value(this);
		}
	}
	// @Override
	public accept<Result>(visitor: YarnSpinnerParserVisitor<Result>): Result {
		if (visitor.visitStructured_command_value) {
			return visitor.visitStructured_command_value(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


