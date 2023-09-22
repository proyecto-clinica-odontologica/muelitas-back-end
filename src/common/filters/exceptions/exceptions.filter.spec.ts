import { ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionsFilter } from './exceptions.filter';

describe('ExceptionsFilter', () => {
  let filter: ExceptionsFilter<unknown>;

  beforeEach(() => {
    filter = new ExceptionsFilter();
  });

  it('debe definirse', () => {
    expect(filter).toBeDefined();
  });

  it('debe devolver la respuesta correcta para una excepción HttpException', () => {
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockHost = {
      switchToHttp: jest.fn().mockReturnThis(),
      getRequest: jest.fn().mockReturnValue({ url: '/test' }),
      getResponse: jest.fn().mockReturnValue(mockResponse),
    };
    const mockException = new HttpException(
      'Test message',
      HttpStatus.BAD_REQUEST,
    );

    filter.catch(mockException, mockHost as unknown as ArgumentsHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: HttpStatus.BAD_REQUEST,
      timestamp: expect.any(String),
      path: '/test',
      message: 'Test message',
    });
  });

  it('debe devolver la respuesta correcta para una excepción que no sea HttpException', () => {
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockHost = {
      switchToHttp: jest.fn().mockReturnThis(),
      getRequest: jest.fn().mockReturnValue({ url: '/test' }),
      getResponse: jest.fn().mockReturnValue(mockResponse),
    };
    const mockException = new Error('Test message');

    filter.catch(mockException, mockHost as unknown as ArgumentsHost);

    expect(mockResponse.status).toHaveBeenCalledWith(
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: expect.any(String),
      path: '/test',
      message: mockException,
    });
  });
});
